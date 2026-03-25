type ListProps = {
  tech: string;
};

const List = ({ tech }: ListProps) => {
  return <li>{tech}</li>;
};

export default List;