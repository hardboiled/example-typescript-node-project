export function getApiBasePath(): string {
  switch (location.hostname) {
    case 'localhost':
      return 'http://localhost:9999/dev'
    default:
      return '' // put some regex here to replace with api subdomain
  }
}
