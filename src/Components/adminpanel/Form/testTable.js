import { Table, Divider } from 'antd';

const tableQuestion = [
  {
    title: 'Numéro',
    dataIndex: 'Numéro',
    key: 'Numéro',
  },
  {
    title: 'Texte',
    dataIndex: 'Texte',
    key: 'Texte',
  },
  {
    title: 'Ressources',
    dataIndex: 'Ressources',
    key: 'Ressources',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text, record) => (
      <span>
        <a href="javascript:;">Invite {record.name}</a>
        <Divider type="vertical" />
        <a href="javascript:;">Delete</a>
      </span>
    ),
  },
];


<Table columns={tableQuestion} dataSource={adminInputQuestions} />