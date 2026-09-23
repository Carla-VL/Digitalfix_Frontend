import {
  ClipboardList,
  Clock3,
  CheckCircle2,
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react'

import { useMsal } from '@azure/msal-react'
import KpiCard from '../components/KpiCard'

const orders = [
  {
    id: 'OT-1048',
    client: 'Edificio Andes',
    service: 'Falla tablero eléctrico',
    status: 'EN_EJECUCIÓN',
    tech: 'J. Morales',
    time: '18 min'
  },
  {
    id: 'OT-1047',
    client: 'Comercial Vega',
    service: 'Corte de suministro',
    status: 'ASIGNADA',
    tech: 'C. Rojas',
    time: '32 min'
  },
  {
    id: 'OT-1046',
    client: 'PyME Norte',
    service: 'Revisión preventiva',
    status: 'CERRADA',
    tech: 'M. Soto',
    time: '1 h 14 min'
  },
  {
    id: 'OT-1045',
    client: 'Bodega Central',
    service: 'Cambio de luminarias',
    status: 'CREADA',
    tech: 'Sin asignar',
    time: '7 min'
  },
]

export default function Dashboard() {
  const { instance, accounts } = useMsal()

  const account =
    instance.getActiveAccount() ||
    accounts[0]

  const firstName =
    account?.name?.split(' ')[0] ||
    'Usuario'

  return (
    <>

      <div className="page-heading">

        <div>

          <span className="eyebrow">
            RESUMEN OPERACIONAL
          </span>

          <h1>
            Hola, {firstName}
          </h1>

          <p>
            Este es el estado actual de las operaciones de DigitalFix.
          </p>

        </div>

        <button className="btn secondary">
          Ver actividad
          <ArrowUpRight size={16}/>
        </button>

      </div>

      <section className="kpi-grid">

        <KpiCard
          title="Órdenes activas"
          value="24"
          helper="+8% vs. ayer"
          icon={ClipboardList}
        />

        <KpiCard
          title="Tiempo promedio"
          value="47 min"
          helper="-5 min esta semana"
          icon={Clock3}
        />

        <KpiCard
          title="Cerradas hoy"
          value="31"
          helper="92% dentro de SLA"
          icon={CheckCircle2}
        />

        <KpiCard
          title="Requieren atención"
          value="5"
          helper="2 sin técnico asignado"
          icon={AlertTriangle}
        />

      </section>

      <section className="two-column">

        <article className="card table-card">

          <div className="section-title">

            <div>

              <h2>
                Órdenes recientes
              </h2>

              <p>
                Actividad de las últimas horas
              </p>

            </div>

            <a href="/workorders">
              Ver todas
            </a>

          </div>

          <div className="table-wrap">

            <table>

              <thead>

                <tr>
                  <th>Orden</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Estado</th>
                  <th>Técnico</th>
                </tr>

              </thead>

              <tbody>

                {orders.map((o) => (

                  <tr key={o.id}>

                    <td>

                      <strong>
                        {o.id}
                      </strong>

                      <small>
                        {o.time}
                      </small>

                    </td>

                    <td>
                      {o.client}
                    </td>

                    <td>
                      {o.service}
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

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </article>

        <article className="card">

          <div className="section-title">

            <div>

              <h2>
                Estado de la red
              </h2>

              <p>
                Distribución de órdenes activas
              </p>

            </div>

          </div>

          <div className="progress-list">

            <div>

              <span>
                En ejecución <b>9</b>
              </span>

              <progress
                value="9"
                max="24"
              />

            </div>

            <div>

              <span>
                En desplazamiento <b>6</b>
              </span>

              <progress
                value="6"
                max="24"
              />

            </div>

            <div>

              <span>
                Asignadas <b>5</b>
              </span>

              <progress
                value="5"
                max="24"
              />

            </div>

            <div>

              <span>
                Creadas <b>4</b>
              </span>

              <progress
                value="4"
                max="24"
              />

            </div>

          </div>

          <div className="mini-alert">

            <AlertTriangle size={18}/>

            <div>

              <b>
                2 órdenes próximas a vencer SLA
              </b>

              <span>
                Revisa asignación y tiempos de llegada.
              </span>

            </div>

          </div>

        </article>

      </section>

    </>
  )
}
