export function CloseIcon({
    size,
    color,
    strokeWidth = 1.5,
}: {
    color?: string;
    size?: number;
    strokeWidth?: number;
}) {
    return (
        <svg
            height={size}
            width={size}
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M1 21L21 1"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
            <path
                d="M21 21L1 1"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function SearchIcon({
    color,
    size,
}: {
    color?: "#363636";
    size?: "14";
}) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 14 14"
            fill="none"
        >
            <path
                d="M11.8878 12.0173L9.21176 9.34129C9.97487 8.46371 10.3674 7.32411 10.3067 6.16273C10.246 5.00135 9.73669 3.90892 8.88621 3.11571C8.03573 2.3225 6.9105 1.89049 5.74771 1.91075C4.58492 1.931 3.47542 2.40193 2.65307 3.22427C1.83073 4.04661 1.3598 5.15612 1.33955 6.31891C1.3193 7.4817 1.75131 8.60693 2.54451 9.45741C3.33772 10.3079 4.43016 10.8172 5.59154 10.8779C6.75292 10.9386 7.89251 10.5461 8.77009 9.78296L11.4461 12.459C11.5054 12.5142 11.5837 12.5442 11.6647 12.5428C11.7456 12.5414 11.8229 12.5086 11.8801 12.4513C11.9374 12.3941 11.9702 12.3168 11.9716 12.2359C11.9731 12.1549 11.943 12.0766 11.8878 12.0173ZM1.97947 6.40483C1.97947 5.64255 2.20551 4.89739 2.62901 4.26357C3.05251 3.62976 3.65445 3.13576 4.35871 2.84405C5.06297 2.55233 5.83791 2.47601 6.58555 2.62472C7.33318 2.77344 8.01993 3.14051 8.55894 3.67952C9.09796 4.21854 9.46503 4.90529 9.61374 5.65292C9.76246 6.40056 9.68613 7.1755 9.39442 7.87976C9.10271 8.58401 8.60871 9.18595 7.97489 9.60945C7.34108 10.033 6.59592 10.259 5.83363 10.259C4.81183 10.2578 3.83222 9.8513 3.1097 9.12877C2.38717 8.40624 1.98071 7.42664 1.97947 6.40483Z"
                fill={color || "#363636"}
            />
        </svg>
    );
}

export function LeftIcon({
    color = "#292D32",
    size = "24",
}: {
    color?: string;
    size?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 19.9201L8.47997 13.4001C7.70997 12.6301 7.70997 11.3701 8.47997 10.6001L15 4.08008"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export function RightIcon({
    color = "#292D32",
    size = "24",
}: {
    color?: string;
    size?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M8.91003 19.9201L15.43 13.4001C16.2 12.6301 16.2 11.3701 15.43 10.6001L8.91003 4.08008"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
}

export const PlusIcon = ({
    color = "#292D32",
    size = "24",
}: {
    color?: string;
    size?: string;
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M12 5V19M5 12H19"
                stroke={color}
                strokeWidth="1.5"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
            />{" "}
        </svg>
    );
};


export function CheckFillIcon({
    color = "#000000",
    size = "20",
}: {
    color?: string;
    size?: string;
}) {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M15 1.33989C16.5083 2.21075 17.7629 3.46042 18.6398 4.96519C19.5167 6.46997 19.9854 8.17766 19.9994 9.91923C20.0135 11.6608 19.5725 13.3758 18.72 14.8946C17.8676 16.4133 16.6332 17.6831 15.1392 18.5782C13.6452 19.4733 11.9434 19.9627 10.2021 19.998C8.46083 20.0332 6.74055 19.6131 5.21155 18.7791C3.68256 17.9452 2.39787 16.7264 1.48467 15.2434C0.571462 13.7604 0.0614093 12.0646 0.00500011 10.3239L0 9.99989L0.00500011 9.67589C0.0610032 7.94888 0.563548 6.26585 1.46364 4.79089C2.36373 3.31592 3.63065 2.09934 5.14089 1.25977C6.65113 0.420205 8.35315 -0.0137108 10.081 0.000330246C11.8089 0.0143713 13.5036 0.47589 15 1.33989ZM13.707 7.29289C13.5348 7.12072 13.3057 7.01729 13.0627 7.002C12.8197 6.98672 12.5794 7.06064 12.387 7.20989L12.293 7.29289L9 10.5849L7.707 9.29289L7.613 9.20989C7.42058 9.06075 7.18037 8.98692 6.9374 9.00225C6.69444 9.01757 6.46541 9.12101 6.29326 9.29315C6.12112 9.4653 6.01768 9.69433 6.00235 9.9373C5.98702 10.1803 6.06086 10.4205 6.21 10.6129L6.293 10.7069L8.293 12.7069L8.387 12.7899C8.56237 12.926 8.77803 12.9998 9 12.9998C9.22197 12.9998 9.43763 12.926 9.613 12.7899L9.707 12.7069L13.707 8.70689L13.79 8.61289C13.9393 8.42049 14.0132 8.18024 13.9979 7.93721C13.9826 7.69419 13.8792 7.46509 13.707 7.29289Z"
                fill={color}
            />
        </svg>
    );
}

export function RemoveFillIcon({
    color = "#000000",
    size = "16",
}: {
    color?: string;
    size?: string;
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 20 20">
            <path
                fill={color}
                d="M2.93 17.07A10 10 0 1 1 17.07 2.93A10 10 0 0 1 2.93 17.07M11.4 10l2.83-2.83l-1.41-1.41L10 8.59L7.17 5.76L5.76 7.17L8.59 10l-2.83 2.83l1.41 1.41L10 11.41l2.83 2.83l1.41-1.41L11.41 10z"
            />
        </svg>
    );
}