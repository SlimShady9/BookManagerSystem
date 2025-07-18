import { ButtonTypeEnum } from "../utils/ButtonType"

function Button({
    label,
    onClick,
    className
}) {

    const getClassName = (label) => {
    switch (label) {
        case ButtonTypeEnum.ADD:
        return 'bg-teal-600 hover:bg-teal-700 text-white font-semibold font-medium py-2 px-4 sm:rounded-lg shadow';
        case ButtonTypeEnum.DELETE:
        return 'text-red-600 hover:underline text-sm';
        case ButtonTypeEnum.EDIT:
        return 'text-blue-600 hover:underline text-sm';
        case ButtonTypeEnum.CANCEL:
        return 'px-4 py-2 text-sm rounded border border-gray-300 text-gray-700 hover:bg-gray-100';
        case ButtonTypeEnum.CONFIRM_DELETE:
        return 'block mx-auto bg-teal-600 hover:bg-teal-700 text-white font-semibold font-medium py-1 px-4 sm:rounded-lg shadow self-center';
        default:
        return '';
        }
    }

    return (
        <>
            <button onClick={onClick}
                className={`${getClassName(label)} ${className}`}
            >
                {label}
            </button>
        </>
    )
}

export default Button