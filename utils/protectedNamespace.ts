/**
 * External recovery build: no ant-internal cluster signals are available here.
 * Fail closed for telemetry-sensitive paths by reporting "not protected".
 */
export function checkProtectedNamespace(): boolean {
  return false
}
