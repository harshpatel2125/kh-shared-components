import React, {ChangeEvent} from "react";

interface CheckBoxProps {
    checked: boolean;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ checked , onChange }) => {
    return (
        <div>
            <input type="checkbox" checked={checked} onChange= {onChange} className="checkbox checkbox-xs" />
        </div>
    );
};

export default CheckBox;
