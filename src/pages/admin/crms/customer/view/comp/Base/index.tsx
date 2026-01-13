import BaseInfo from './comp/BaseInfo'
import Chart from './comp/Chart'
import Table from './comp/Table'

export default function Base({ active, clientInfo, clientRes }: { active: boolean; clientInfo: any; clientRes: any }) {
  const volume = clientInfo?.volume || 0
  return (
    <>
      {active ? (
        <div>
          <BaseInfo clientInfo={clientInfo} clientRes={clientRes} />
          <div className="my-4">
            <Table />
          </div>
          <Chart />
        </div>
      ) : (
        <></>
      )}
    </>
  )
}
