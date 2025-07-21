interface Props {
  message: string;
  type: 'success' | 'error';
}

const Notification = ({ message, type }: Props) => {
  const style = {
    border: '2px solid',
    borderColor: type === 'success' ? 'green' : 'red',
    color: type === 'success' ? 'green' : 'red',
    padding: '10px',
    marginBottom: '10px'
  };

  return <div style={style}>{message}</div>;
};

export default Notification;
