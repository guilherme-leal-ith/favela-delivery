const labels = {
  PENDENTE: 'Pendente',
  EM_PREPARO: 'Em preparo',
  A_CAMINHO: 'A caminho',
  ENTREGUE: 'Entregue',
  CANCELADO: 'Cancelado',
  RECUSADO: 'Recusado',
};

export default function StatusBadge({ status }) {
  return <span className={`status-badge status-${status}`}>{labels[status] || status}</span>;
}
