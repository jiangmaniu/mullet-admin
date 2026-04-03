const UI_STATUS_I18N_KEY: Record<string, string> = {
  completed: 'fundManagement.depositDetail.statusCompleted',
  confirmed: 'fundManagement.depositDetail.statusConfirmed',
  failed: 'fundManagement.depositDetail.statusFailed',
  pending: 'fundManagement.depositDetail.statusPending',
  confirming: 'fundManagement.depositDetail.statusConfirming'
}

const STATUS_COLOR: Record<string, string> = {
  SUCCESS: 'success',
  FAIL: 'error',
  WAIT: 'warning'
}

export const getStatusLabel = (status: string, intl: { formatMessage: (d: { id: string }) => string }): string => {
  const key = UI_STATUS_I18N_KEY[status]
  return key ? intl.formatMessage({ id: key }) : ''
}

export const getStatusColor = (status: string): string => {
  return STATUS_COLOR[status] ?? 'default'
}
