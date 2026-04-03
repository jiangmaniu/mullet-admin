const UI_STATUS_I18N_KEY: Record<string, string> = {
  completed: 'fundManagement.withdrawalDetail.statusCompleted',
  confirmed: 'fundManagement.withdrawalDetail.statusConfirmed',
  failed: 'fundManagement.withdrawalDetail.statusFailed',
  pending: 'fundManagement.withdrawalDetail.statusPending',
  confirming: 'fundManagement.withdrawalDetail.statusConfirming',
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
