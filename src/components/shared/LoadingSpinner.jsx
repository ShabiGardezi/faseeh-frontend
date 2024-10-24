import { ThreeDots } from "react-loader-spinner";

function LoadingSpinner({color='#20b1c9', width='100', height='100',}) {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ThreeDots
        height={width}
        width={height}
        radius={5}
        color={color}
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default LoadingSpinner;