import { FC } from "react";

type Props = {
  text?: string
};

const Loader : FC<Props> = ({text}) => {
  return (
    <div className="relative inline-flex" >
      <div className="w-6 h-6 border-purple-200 border-2 rounded-full"></div>
      <div className="w-6 h-6 border-cyan-700 border-t-2 animate-spin rounded-full absolute left-0 top-0"></div>
      <div className="mt-1 ml-2">{text}</div>
    </div>
  );
};

export default Loader;
