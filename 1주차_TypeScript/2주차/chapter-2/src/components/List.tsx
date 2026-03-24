// tech라는 props가 단순히 string 타입이 아니라, 실제 사용하는 기술 스택만 받을 수 있도록 유니온 타입으로 제한
type Tech = 'REACT' | 'NEXT' | 'VUE' | 'SVELTE' | 'ANGULAR' | 'REACT-NATIVE';

interface ListProps {
  tech: Tech;
}

const List = (props: ListProps) => {
  return (
    <li style={{ listStyle: 'none' }}>
      {props.tech === 'REACT' ? '고구마와 함께하는 리액트' : props.tech}
    </li>
  )
};

export default List;