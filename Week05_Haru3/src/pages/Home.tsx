import useGetLpList from "../hooks/queries/useGetLpList";


const Home =() => {
    const {data, isPending, isError} = useGetLpList({});

    return <div>
        {data?.map((lp) => <h1>{lp.title}</h1>)}
    </div>
};

export default Home;