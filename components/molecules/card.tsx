import { FC } from "react";
import { AppSelect } from "../atoms/inputs/app-select";
export const Card: FC<{}> = ({}) => {
  return (
    <div className="rounded-xl bg-light-grey flex w-full flex-col p-5 gap-3 justify-center items-center self-stretch">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1 items-start">
            <div className="w-3 h-[1px] bg-grey"></div>
            <div className="w-3 h-[1px] bg-grey"></div>
          </div>
          <h5 className="text-grey text-base font-bold leading-[150%]">Link</h5>
        </div>
        <button type="button" className="text-grey text-body-m">
          Remove
        </button>
      </div>
      <AppSelect name="Twitter" value="twitter" />
    </div>
  );
};
