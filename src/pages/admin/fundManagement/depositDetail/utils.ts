const UI_STATUS_I18N_KEY: Record<string, string> = {
  completed: 'fundManagement.depositDetail.statusCompleted',
  failed: 'fundManagement.depositDetail.statusFailed',
  pending: 'fundManagement.depositDetail.statusPending',
  submitted: 'fundManagement.depositDetail.statusConfirming',
  processing: 'fundManagement.depositDetail.statusConfirming'
}

const STATUS_COLOR: Record<string, string> = {
  completed: 'success',
  failed: 'error',
  pending: 'warning',
  submitted: 'processing',
  processing: 'processing'
}

export const getStatusLabel = (status: string, intl: { formatMessage: (d: { id: string }) => string }): string => {
  const key = UI_STATUS_I18N_KEY[status]
  return key ? intl.formatMessage({ id: key }) : ''
}

export const getStatusColor = (status: string): string => {
  return STATUS_COLOR[status] ?? 'default'
}
