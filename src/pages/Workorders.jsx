import { useMemo, useState } from 'react'
import { Plus, Search, SlidersHorizontal, X } from 'lucide-react'
import { useMsal } from '@azure/msal-react'

const initialOrders = [
  {
    id: 'OT-1048',
    client: 'Edificio Andes',
    service: 'Falla tablero eléctrico',
    address: 'Providencia, Santiago',
    status: 'EN_EJECUCIÓN',
    tech: 'J. Morales',
    created: '20/09/2026 18:42'
  },
  {
    id: 'OT-1047',
    client: 'Comercial Vega',
    service: 'Corte de suministro',
    address: 'Ñuñoa, Santiago',
    status: 'ASIGNADA',
    tech: 'C. Rojas',
    created: '20/09/2026 18:10'
  },
  {
    id: 'OT-1046',
    client: 'PyME Norte',
    service: 'Revisión preventiva',
    address: 'Huechuraba, Santiago',
    status: 'CERRADA',
    tech: 'M. Soto',
    created: '20/09/2026 16:55'
  },
  {
    id: 'OT-1045',
    client: 'Bodega Central',
    service: 'Cambio de luminarias',
    address: 'Quilicura, Santiago',
    status: 'CREADA',
    tech: 'Sin asignar',
    created: '20/09/2026 16:20'
  },
]

export default function Workorders() {
  const { instance, accounts } = useMsal()

  const account =
    instance.getActiveAccount() ||
    accounts[0]

  const roles =
    (account?.idTokenClaims?.roles || [])
      .map(role => role.toUpperCase())

  const isAuditor =
    roles.includes('AUDITOR')

  const [orders, setOrders] = useState(initialOrders)
  const [q, setQ] = useState('')
  const [show, setShow] = useState(false)

  const [form, setForm] = useState({
    client: '',
    service: '',
    address: ''
  })

  const filtered = useMemo(() => {
    return orders.filter((o) =>
      Object.values(o)
        .join(' ')
        .toLowerCase()
        .includes(q.toLowerCase())
    )
  }, [orders, q])

  const create = (e) => {
    e.preventDefault()

    const newOrder = {
      id: `OT-${1049 + orders.length}`,
      ...form,
      status: 'CREADA',
      tech: 'Sin asignar',
      created: new Date().toLocaleString('es-CL')
    }

    setOrders([
      newOrder,
      ...orders
    ])

    setShow(false)

    setForm({
      client: '',
      service: '',
      address: ''
    })
  }

  return (
    <>

      <div className="page-heading">

        <div>

          <span className="eyebrow">
            GESTIÓN DE ÓRDENES
          </span>

          <h1>
            Órdenes de trabajo
          </h1>

          <p>
            Crea, asigna y consulta trabajos de mantención.
          </p>

        </div>

        {!isAuditor && (
          <button
            className="btn primary"
            onClick={() => setShow(true)}
          >
            <Plus size={17}/>
            Nueva orden
          </button>
        )}

      </div>

      <article className="card table-card">

        <div className="toolbar">

          <div className="search">

            <Search size={18}/>

            <input
              placeholder="Buscar por orden, cliente o servicio..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />

          </div>

          <button className="btn secondary">
            <SlidersHorizontal size={17}/>
            Filtros
          </button>

        </div>

        <div className="table-wrap">

          <table>

            <thead>

              <tr>
                <th>Orden</th>
                <th>Cliente</th>
                <th>Servicio</th>
                <th>Dirección</th>
                <th>Estado</th>
                <th>Técnico</th>
                <th>Creación</th>
              </tr>

            </thead>

            <tbody>

              {filtered.map((o) => (

                <tr key={o.id}>

                  <td>
                    <strong>
                      {o.id}
                    </strong>
                  </td>

                  <td>
                    {o.client}
                  </td>

                  <td>
                    {o.service}
                  </td>

                  <td>
                    {o.address}
                  </td>

                  <td>

                    <span
                      className={`badge ${o.status.toLowerCase()}`}
                    >
                      {o.status.replaceAll('_', ' ')}
                    </span>

                  </td>

                  <td>
                    {o.tech}
                  </td>

                  <td>
                    {o.created}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </article>

      {show && (

        <div className="modal-backdrop">

          <form
            className="modal card"
            onSubmit={create}
          >

            <div className="section-title">

              <div>

                <h2>
                  Nueva orden
                </h2>

                <p>
                  Registra un trabajo de mantención.
                </p>

              </div>

              <button
                type="button"
                className="icon-button"
                onClick={() => setShow(false)}
              >
                <X/>
              </button>

            </div>

            <label>
              Cliente

              <input
                required
                value={form.client}
                onChange={(e) =>
                  setForm({
                    ...form,
                    client: e.target.value
                  })
                }
              />

            </label>

            <label>
              Servicio

              <input
                required
                value={form.service}
                onChange={(e) =>
                  setForm({
                    ...form,
                    service: e.target.value
                  })
                }
              />

            </label>

            <label>
              Dirección

              <input
                required
                value={form.address}
                onChange={(e) =>
                  setForm({
                    ...form,
                    address: e.target.value
                  })
                }
              />

            </label>

            <div className="modal-actions">

              <button
                type="button"
                className="btn secondary"
                onClick={() => setShow(false)}
              >
                Cancelar
              </button>

              <button
                className="btn primary"
              >
                Crear orden
              </button>

            </div>

          </form>

        </div>

      )}

    </>
  )
}