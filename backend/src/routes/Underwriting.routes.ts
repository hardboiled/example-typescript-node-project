import express, { Request, Response } from 'express'
import { AppDataSource } from '../data-source'
import { HarzardRisk } from '../entity/HazardRisk.entity'
import { HarzardRiskRaw } from '../entity/HazardRiskRaw.entity'

const router = express.Router()

interface PatchIndexScoreParams {
  nriID: string | undefined
  county: string | undefined
  rfldRisks: number | undefined
  resetToDefault: boolean | undefined
}

interface PostProcessPolicyParams {
  policy: {
    config_version: string
    created_timestamp: string
    display_id: string
    effective_contract_end_timestamp: string
    exposures: [
      {
        created_timestamp: string
        locator: string
        address_1: string
        city: string
        construction_type: string
        county: string
        heating_source: string
        occupancy: string
        property_type: string
        replacement_cost: string
        state: string
        total_sq_feet: string
        zip: string
      },
      {
        created_timestamp: string
        locator: string
        address_1: string
        city: string
        construction_type: string
        county: string
        occupancy: string
        property_type: string
        replacement_cost: string
        state: string
        total_sq_feet: string
        zip: string
      },
      {
        created_timestamp: string
        locator: string
        address_1: string
        city: string
        construction_type: string
        county: string
        occupancy: string
        property_type: string
        replacement_cost: string
        state: string
        total_sq_feet: string
        zip: string
      }
    ]
  }
  policyholder: {
    created_timestamp: string
    entity: {
      account_locator: string
      updated_timestamp: string
      values: {
        date_of_birth: string
        first_name: string[]
        last_name: string[]
      }
    }
  }
}

interface PostProcessPolicyResponse {
  premium: number
  status: 'reject' | 'accept'
}

router.patch('/index_score', async (req: Request, res: Response) => {
  const { nriID, county, rfldRisks, resetToDefault } = req.body as PatchIndexScoreParams

  if (!(nriID && county && (rfldRisks || resetToDefault))) {
    res.status(422).send({ errors: ['nriID, county, and either rfldRisks or resetToDefault must be provided'] })
    return
  }

  try {
    const result = await AppDataSource.manager.findOneBy(HarzardRisk, { nriID, county })

    if (!result) {
      res.writeHead(404)
      res.end()
      return
    }

    let rfldRisksUpdated = rfldRisks
    if (resetToDefault) {
      // would update with where clause instead of fetching row, but unfamiliar with new ORM syntax/api
      const raw = await AppDataSource.manager.findOneBy(HarzardRiskRaw, { nriID, county })
      rfldRisksUpdated = raw?.rfldRisks
    }

    await AppDataSource.manager.save(HarzardRisk, {
      id: result.id,
      rfldRisks: rfldRisksUpdated,
    })

    res.writeHead(204)
    res.end()
  } catch (e) {
    console.error(e)
    res.status(400).send({ errors: ['unable to save change'] })
  }
})

router.post('/process_policy', async (req: Request, res: Response) => {
  const body = req.body as PostProcessPolicyParams

  const results = body?.policy?.exposures?.map((x) => [x.county, parseInt(x.total_sq_feet)] as [string, number]) || []

  if (results.length === 0) {
    res.status(422).send({ errors: ['exposures malformated or empty'] })
  }

  try {
    const response: PostProcessPolicyResponse = { premium: 0, status: 'reject' }
    const hazards = await Promise.all(
      results.map((x) => AppDataSource.manager.findOneBy(HarzardRisk, { county: x[0] }))
    )
    if (hazards.filter((x) => (x?.rfldRisks || 0) < 40).length < hazards.length) {
      // reject premium calculation
      res.status(200).send(response)
      return
    }

    response.status = 'accept'
    for (let i = 0; i < hazards.length; ++i) {
      const risk = hazards[i]?.rfldRisks || 0
      const sqft = results[i][1]
      let multiplier = 1
      if (risk < 20) {
        multiplier = 0.25
      } else if (risk < 30) {
        multiplier = 0.5
      }

      response.premium += multiplier * sqft
    }

    res.status(200).send(response)
  } catch (e) {
    console.error(e)
    res.status(400).send({ errors: ['unable to calculate policy'] })
  }
})

export default router
