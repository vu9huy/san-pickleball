
// đặt 1 đằng sau IconSprites để sau này có nhiều icon thì chia ra làm nhiều file nhỏ như IconSprites2, IconSprites3...
export const IconSprites1 = ({ id, ...props }) => {
    return (
        <svg {...props}>
            <use href={`/icons/icons-sprites-1.svg#${id}`} />
        </svg>
    );
};

export const IconSprites2 = ({ id, ...props }) => {
    return (
        <svg {...props}>
            <use href={`/icons/icons-sprites-2.svg#${id}`} />
        </svg>
    );
};

