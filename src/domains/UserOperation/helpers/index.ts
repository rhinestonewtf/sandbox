import { UserOperationActivityDetails } from '@/src/domains/UserOperation/UserOperation'

export function sumUserOpValues(
  userOps: UserOperationActivityDetails[],
): string {
  const sum = userOps.reduce((acc, o) => acc + o.value, 0)
  return sum.toString()
}
