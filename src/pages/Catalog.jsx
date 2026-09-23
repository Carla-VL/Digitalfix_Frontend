import { Search, Package, Wrench } from 'lucide-react'
const rows=[
 {name:'Diagnóstico eléctrico',type:'Servicio',stock:'—',price:'$35.000',status:'Disponible'},
 {name:'Reparación tablero',type:'Servicio',stock:'—',price:'$58.000',status:'Disponible'},
 {name:'Interruptor automático 16A',type:'Repuesto',stock:'24',price:'$8.990',status:'Disponible'},
 {name:'Cable THHN 2,5 mm²',type:'Repuesto',stock:'8',price:'$1.490 / m',status:'Stock bajo'},
 {name:'Luminaria LED 18W',type:'Repuesto',stock:'42',price:'$12.990',status:'Disponible'}]
export default function Catalog(){return <><div className="page-heading"><div><span className="eyebrow">CATÁLOGO TÉCNICO</span><h1>Servicios y repuestos</h1><p>Consulta disponibilidad, tarifas y stock técnico.</p></div><button className="btn primary">Agregar ítem</button></div><section className="summary-strip"><div><Wrench/><span><b>12</b> servicios activos</span></div><div><Package/><span><b>186</b> unidades en stock</span></div></section><article className="card table-card"><div className="toolbar"><div className="search"><Search size={18}/><input placeholder="Buscar en catálogo..."/></div></div><div className="table-wrap"><table><thead><tr><th>Nombre</th><th>Tipo</th><th>Stock</th><th>Tarifa</th><th>Estado</th></tr></thead><tbody>{rows.map(r=><tr key={r.name}><td><strong>{r.name}</strong></td><td>{r.type}</td><td>{r.stock}</td><td>{r.price}</td><td><span className={`badge ${r.status==='Stock bajo'?'warning':'closed'}`}>{r.status}</span></td></tr>)}</tbody></table></div></article></>}
