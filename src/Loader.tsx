interface LoaderProps{
    className?:string
}

export default function Loader({className=""}:LoaderProps){
    return (
        <div className={`${className} flex items-center justify-center`}>
            Loading.....
        </div>
    );
}