"use client";
import { FC, useState } from "react";
import { AppSelect } from "../atoms/inputs/app-select";
import { AppInput } from "../atoms/inputs/app-input";
export const Card: FC<{
  platform: string;
  link: string;
  index: number;
  onUpdatePlatform: (platform: string) => void;
  onUpdateLink: (link: string) => void;
  removeLink: () => void;
  updateDropdown: () => void;
  dropdown: boolean;
  closeDropdown: () => void;
}> = ({
  platform,
  link,
  onUpdatePlatform,
  onUpdateLink,
  index,
  removeLink,
  updateDropdown,
  dropdown,
  closeDropdown,
}) => {
  const [selectedLink, setSelectedLink] = useState<string>("");
  const selectedLinkHandler = (value: string) => {
    setSelectedLink(value);
  };
  const [value, setValue] = useState<string>("");
  return (
    <div className="rounded-xl bg-light-grey flex w-full flex-col p-5 !gap-3 justify-center items-center self-stretch">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-2 items-center">
          <div className="flex flex-col gap-1 items-start">
            <div className="w-3 h-[1px] bg-grey"></div>
            <div className="w-3 h-[1px] bg-grey"></div>
          </div>
          <h5 className="text-grey text-base font-bold leading-[150%]">
            Link #{index + 1}
          </h5>
        </div>
        <button
          onClick={removeLink}
          type="button"
          className="text-grey text-body-m"
        >
          Remove
        </button>
      </div>
      <AppSelect
        platform={platform}
        onSelect={onUpdatePlatform}
        dropdown={dropdown}
        closeDropdown={closeDropdown}
        dropdownHandler={updateDropdown}
      />
      <AppInput
        id="link"
        title="Link"
        type="url"
        value={link}
        onChange={(e) => onUpdateLink(e.target.value)}
        placeholder="https://example.com"
        required
        hasIcon
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path
            d="M7.52312 10.7207C7.59304 10.7903 7.64852 10.8731 7.68638 10.9643C7.72423 11.0555 7.74372 11.1532 7.74372 11.2519C7.74372 11.3506 7.72423 11.4484 7.68638 11.5395C7.64852 11.6307 7.59304 11.7135 7.52312 11.7832L7.15187 12.1544C6.44839 12.8579 5.49425 13.2531 4.49937 13.2531C3.50449 13.2531 2.55036 12.8579 1.84687 12.1544C1.14339 11.4509 0.748173 10.4968 0.748173 9.5019C0.748173 8.50702 1.14339 7.55289 1.84687 6.8494L3.35437 5.34253C4.0303 4.66493 4.93973 4.27142 5.89639 4.2426C6.85304 4.21378 7.78451 4.55184 8.5 5.18753C8.57387 5.25319 8.63408 5.33276 8.6772 5.42169C8.72032 5.51062 8.7455 5.60717 8.7513 5.70583C8.7571 5.8045 8.74342 5.90333 8.71102 5.99671C8.67863 6.09008 8.62816 6.17616 8.5625 6.25003C8.49684 6.3239 8.41727 6.38411 8.32834 6.42723C8.23941 6.47035 8.14286 6.49552 8.04419 6.50133C7.94553 6.50713 7.84669 6.49345 7.75332 6.46105C7.65995 6.42866 7.57387 6.37819 7.5 6.31253C7.07095 5.93148 6.51252 5.72877 5.93895 5.74584C5.36537 5.76292 4.81999 5.9985 4.41437 6.4044L2.90812 7.9094C2.4861 8.33143 2.24901 8.90382 2.24901 9.50065C2.24901 10.0975 2.4861 10.6699 2.90812 11.0919C3.33015 11.5139 3.90254 11.751 4.49937 11.751C5.09621 11.751 5.6686 11.5139 6.09062 11.0919L6.46187 10.7207C6.53153 10.6509 6.61424 10.5956 6.70529 10.5579C6.79634 10.5201 6.89394 10.5007 6.9925 10.5007C7.09106 10.5007 7.18866 10.5201 7.2797 10.5579C7.37075 10.5956 7.45347 10.6509 7.52312 10.7207ZM12.1531 1.84565C11.4491 1.14325 10.4951 0.748779 9.50062 0.748779C8.5061 0.748779 7.55219 1.14325 6.84812 1.84565L6.47687 2.2169C6.33598 2.3578 6.25682 2.54889 6.25682 2.74815C6.25682 2.94741 6.33598 3.13851 6.47687 3.2794C6.61777 3.4203 6.80887 3.49945 7.00812 3.49945C7.20738 3.49945 7.39848 3.4203 7.53937 3.2794L7.91062 2.90815C8.33265 2.48613 8.90504 2.24903 9.50187 2.24903C10.0987 2.24903 10.6711 2.48613 11.0931 2.90815C11.5152 3.33018 11.7522 3.90257 11.7522 4.4994C11.7522 5.09624 11.5152 5.66863 11.0931 6.09065L9.58625 7.59815C9.18027 8.00388 8.63459 8.23912 8.06087 8.25574C7.48715 8.27235 6.92877 8.06908 6.5 7.68753C6.42613 7.62187 6.34005 7.5714 6.24668 7.539C6.15331 7.50661 6.05447 7.49292 5.9558 7.49873C5.85714 7.50453 5.76059 7.52971 5.67166 7.57283C5.58273 7.61595 5.50316 7.67616 5.4375 7.75003C5.37184 7.8239 5.32137 7.90997 5.28898 8.00335C5.25658 8.09672 5.24289 8.19556 5.2487 8.29422C5.2545 8.39288 5.27968 8.48944 5.3228 8.57837C5.36592 8.6673 5.42613 8.74687 5.5 8.81253C6.21499 9.44807 7.14583 9.78634 8.10204 9.75811C9.05824 9.72987 9.9675 9.33727 10.6437 8.66065L12.1512 7.15378C12.8545 6.44989 13.2496 5.49571 13.25 4.50073C13.2503 3.50575 12.8559 2.55129 12.1531 1.8469V1.84565Z"
            fill="#737373"
          />
        </svg>
      </AppInput>
    </div>
  );
};
