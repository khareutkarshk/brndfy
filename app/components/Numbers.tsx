"use client";

import React, { useEffect, useRef, useState } from "react";

// ─── Stat data ────────────────────────────────────────────────────────────────
const STATS = [
    {
        value: 1000,
        suffix: "+",
        label: "Campus\nAmbassadors",
        icon: (
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.64403 36.3221C3.71838 33.9275 1.09814 29.6049 1.09814 24.6696C1.09814 17.1356 7.20418 11.0297 14.738 11.0297C19.6734 11.0297 23.9959 13.65 26.3905 17.5755C28.9551 16.8018 31.674 16.3858 34.4894 16.3858C37.6304 16.3858 40.6516 16.9038 43.4721 17.8583C46.1127 14.6915 48.2503 11.006 50.2023 7.61592C50.213 7.59459 50.2244 7.57326 50.2365 7.55239C50.4836 7.12275 50.7294 6.69828 50.9723 6.28024C51.2533 5.7949 51.5311 5.3182 51.8069 4.85279C51.8078 4.85138 51.8101 4.84745 51.8101 4.84745C52.4693 3.73765 53.5687 3.11616 54.8527 3.12526C56.1363 3.1342 57.2315 3.77059 57.872 4.87992L61.9777 11.9915C64.4898 11.1061 67.3546 12.1049 68.7347 14.4951C70.1148 16.8854 69.5472 19.8658 67.5245 21.5987L71.6304 28.7102C72.2897 29.8523 72.2737 31.1621 71.5904 32.2864C70.908 33.4089 69.7651 34.0263 68.4475 33.9744H68.4447C67.9087 33.9535 67.3703 33.9322 66.8304 33.9129C64.7347 33.8413 62.6097 33.807 60.4776 33.8934C61.7973 37.1446 62.5245 40.6984 62.5245 44.4209C62.5245 47.2362 62.1083 49.9552 61.3347 52.5196C65.2602 54.9143 67.8806 59.2369 67.8806 64.1722C67.8806 71.7061 61.7745 77.8122 54.2407 77.8122C49.3054 77.8122 44.9827 75.1918 42.588 71.2663C40.0236 72.0399 37.3047 72.4561 34.4894 72.4561C31.674 72.4561 28.9551 72.0399 26.3905 71.2663C23.9959 75.1918 19.6734 77.8122 14.738 77.8122C7.20418 77.8122 1.09814 71.7061 1.09814 64.1722C1.09814 59.2369 3.71838 54.9143 7.64403 52.5196C6.87022 49.9552 6.45422 47.2362 6.45422 44.4209C6.45422 41.6056 6.87022 38.8867 7.64403 36.3221ZM27.5072 19.8636C28.0701 21.3584 28.3778 22.978 28.3778 24.6696C28.3778 32.2034 22.2719 38.3094 14.738 38.3094C13.0464 38.3094 11.4268 38.0015 9.93203 37.4388C9.30144 39.6583 8.96403 42.0004 8.96403 44.4209C8.96403 46.8413 9.30144 49.1836 9.93203 51.4029C11.4268 50.8402 13.0464 50.5323 14.738 50.5323C22.2719 50.5323 28.3778 56.6384 28.3778 64.1722C28.3778 65.8639 28.0701 67.4835 27.5072 68.9781C29.7267 69.6089 32.069 69.9463 34.4894 69.9463C36.9098 69.9463 39.252 69.6089 41.4713 68.9781C40.9087 67.4835 40.6009 65.8639 40.6009 64.1722C40.6009 56.6384 46.7068 50.5323 54.2407 50.5323C55.9323 50.5323 57.5519 50.8402 59.0467 51.4029C59.6773 49.1836 60.0147 46.8413 60.0147 44.4209C60.0147 40.7367 59.2327 37.2336 57.8254 34.0691C55.3967 34.298 52.9706 34.7281 50.5794 35.4829L56.5946 45.9016C56.9411 46.5017 56.7355 47.2693 56.1353 47.6158L54.8975 48.3304C52.3534 49.7993 49.0757 48.9212 47.6069 46.377L43.4991 39.2622L42.5992 39.7819C38.4608 42.1712 33.1225 40.7358 30.7366 36.6032C28.3507 32.4707 29.7767 27.1298 33.9151 24.7405C35.0232 24.1008 39.4552 21.542 40.5634 20.902C40.9218 20.5802 41.2715 20.2471 41.6131 19.9044C39.3518 19.2475 36.9614 18.8956 34.4894 18.8956C32.069 18.8956 29.7267 19.233 27.5072 19.8636ZM51.3184 10.6776C48.9664 14.6816 46.2994 18.8948 42.8906 22.1654L49.2967 33.2613C53.8873 31.7257 58.6056 31.3375 63.2465 31.3375L51.3184 10.6776ZM63.2735 14.2357L66.2288 19.3544C67.0683 18.3736 67.2436 16.9318 66.5612 15.75C65.8789 14.5682 64.5429 13.9991 63.2735 14.2357ZM68.5446 31.4664H68.5455C68.9231 31.4813 69.2503 31.3042 69.4458 30.9827C69.6401 30.6628 69.6443 30.2901 69.4567 29.9651L55.6985 6.13483C55.5154 5.81796 55.2017 5.63757 54.8349 5.6349C54.4691 5.63239 54.1571 5.81169 53.9689 6.12745L53.9681 6.12902C53.5789 6.79145 53.1789 7.47647 52.7731 8.17765C54.9468 11.9425 66.1689 31.3797 66.1687 31.3797C66.5422 31.3911 66.9149 31.4043 67.2868 31.4181C67.7072 31.433 68.1265 31.4493 68.5446 31.4664ZM40.8431 23.6387L35.17 26.9141C32.2277 28.6129 31.2138 32.4101 32.9101 35.3483C34.6064 38.2865 38.402 39.3071 41.3443 37.6082L47.0174 34.3329L40.8431 23.6387ZM45.6727 38.0073L49.7803 45.1221C50.5585 46.4699 52.2949 46.9351 53.6426 46.1569L53.7937 46.0697L48.2723 36.5064L45.6727 38.0073ZM63.4624 70.4068C64.6671 68.6282 65.3708 66.4824 65.3708 64.1722C65.3708 58.0245 60.3883 53.0421 54.2407 53.0421C48.0931 53.0421 43.1107 58.0245 43.1107 64.1722C43.1107 66.4824 43.8142 68.6282 45.0189 70.4068C45.9731 67.9709 47.8638 66.0048 50.2475 64.9521C49.2376 63.9334 48.6119 62.5334 48.6119 60.994C48.6119 57.8972 51.144 55.3653 54.2407 55.3653C57.3375 55.3653 59.8694 57.8972 59.8694 60.994C59.8694 62.5334 59.2437 63.9334 58.2338 64.9521C60.6175 66.0048 62.5082 67.9709 63.4624 70.4068ZM46.983 72.6112C48.9316 74.2884 51.4676 75.3024 54.2407 75.3024C57.0138 75.3024 59.5498 74.2884 61.4983 72.6112C60.8425 69.2001 57.8414 66.6227 54.2407 66.6227C50.6399 66.6227 47.639 69.2001 46.983 72.6112ZM54.2407 64.1129C55.9567 64.1129 57.3596 62.7099 57.3596 60.994C57.3596 59.278 55.9567 57.8751 54.2407 57.8751C52.5247 57.8751 51.1217 59.278 51.1217 60.994C51.1217 62.7099 52.5247 64.1129 54.2407 64.1129ZM23.9596 70.4068C25.1643 68.6282 25.868 66.4824 25.868 64.1722C25.868 58.0245 20.8856 53.0421 14.738 53.0421C8.59038 53.0421 3.60795 58.0245 3.60795 64.1722C3.60795 66.4824 4.31164 68.6282 5.51634 70.4068C6.47054 67.9709 8.36105 66.0048 10.7447 64.9521C9.73501 63.9334 9.10928 62.5334 9.10928 60.994C9.10928 57.8972 11.6412 55.3653 14.738 55.3653C17.8348 55.3653 20.3667 57.8972 20.3667 60.994C20.3667 62.5334 19.741 63.9334 18.7312 64.9521C21.1149 66.0048 23.0056 67.9709 23.9596 70.4068ZM7.48042 72.6112C9.42897 74.2884 11.965 75.3024 14.738 75.3024C17.5112 75.3024 20.0472 74.2884 21.9957 72.6112C21.3397 69.2001 18.3388 66.6227 14.738 66.6227C11.1372 66.6227 8.13626 69.2001 7.48042 72.6112ZM14.738 64.1129C16.4539 64.1129 17.8569 62.7099 17.8569 60.994C17.8569 59.278 16.4539 57.8751 14.738 57.8751C13.0221 57.8751 11.6191 59.278 11.6191 60.994C11.6191 62.7099 13.0221 64.1129 14.738 64.1129ZM23.9596 30.9041C25.1643 29.1256 25.868 26.9798 25.868 24.6696C25.868 18.522 20.8856 13.5395 14.738 13.5395C8.59038 13.5395 3.60795 18.522 3.60795 24.6696C3.60795 26.9798 4.31164 29.1256 5.51634 30.9041C6.47054 28.4683 8.36105 26.502 10.7447 25.4493C9.73501 24.4307 9.10928 23.0308 9.10928 21.4914C9.10928 18.3946 11.6412 15.8627 14.738 15.8627C17.8348 15.8627 20.3667 18.3946 20.3667 21.4914C20.3667 23.0308 19.741 24.4307 18.7312 25.4493C21.1149 26.502 23.0056 28.4683 23.9596 30.9041ZM7.48042 33.1085C9.42897 34.7858 11.965 35.7996 14.738 35.7996C17.5112 35.7996 20.0472 34.7858 21.9957 33.1085C21.3397 29.6973 18.3388 27.1201 14.738 27.1201C11.1372 27.1201 8.13626 29.6973 7.48042 33.1085ZM14.738 24.6103C16.4539 24.6103 17.8569 23.2073 17.8569 21.4914C17.8569 19.7755 16.4539 18.3725 14.738 18.3725C13.0221 18.3725 11.6191 19.7755 11.6191 21.4914C11.6191 23.2073 13.0221 24.6103 14.738 24.6103ZM67.5438 7.87349C67.3645 8.54251 66.6759 8.94 66.0069 8.76087C65.3378 8.58157 64.9402 7.89279 65.1195 7.22392L66.2197 3.11789C66.3988 2.44887 67.0876 2.05122 67.7565 2.23051C68.4255 2.40981 68.8232 3.09843 68.6439 3.76745L67.5438 7.87349ZM73.2123 21.3016C72.5435 21.1216 72.1465 20.4326 72.3264 19.7638C72.5063 19.095 73.1954 18.698 73.8643 18.8779L77.9731 19.9833C78.642 20.1631 79.0389 20.8522 78.8589 21.521C78.679 22.1899 77.9901 22.5867 77.3212 22.4068L73.2123 21.3016ZM73.1571 13.4181C72.5573 13.7643 71.7891 13.5585 71.4429 12.9588C71.0966 12.359 71.3024 11.5908 71.9022 11.2445L75.5904 9.11522C76.1902 8.76887 76.9582 8.97467 77.3046 9.57451C77.6509 10.1744 77.4451 10.9425 76.8453 11.2887L73.1571 13.4181Z" fill="#1744FF" />
            </svg>

        ),
    },
    {
        value: 120,
        suffix: "+",
        label: "College\nPartnerships",
        icon: (
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M32.6091 11.6655C37.3457 9.44483 42.6541 9.44483 47.3907 11.6655L69.6947 22.1221C74.5464 24.3966 74.5464 32.2702 69.6947 34.5447L47.3911 45.0013C42.6544 47.2217 37.3461 47.2217 32.6094 45.0013L10.3054 34.5447C5.45384 32.27 5.45388 24.3965 10.3054 22.122L32.6091 11.6655Z" stroke="#1744FF" strokeWidth="5" />
                <path d="M6.66675 28.3333V46.6666" stroke="#1744FF" strokeWidth="5" strokeLinecap="round" />
                <path d="M63.3334 38.3333V55.4179C63.3334 58.7779 61.6551 61.9239 58.7158 63.5519C53.8211 66.2622 45.9867 69.9999 40.0001 69.9999C34.0134 69.9999 26.1791 66.2622 21.2845 63.5519C18.3451 61.9239 16.6667 58.7779 16.6667 55.4179V38.3333" stroke="#1744FF" strokeWidth="5" strokeLinecap="round" />
            </svg>

        ),
    },
    {
        value: 100,
        suffix: "+",
        label: "Brands\nOnboarded",
        icon: (
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 50C10 59.428 10 64.142 12.9289 67.071C15.8579 70 20.5719 70 30 70H50C59.428 70 64.142 70 67.071 67.071C70 64.142 70 59.428 70 50" stroke="#1744FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M40.0001 10V53.3333M40.0001 53.3333L53.3334 38.75M40.0001 53.3333L26.6667 38.75" stroke="#1744FF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>

        ),
    },
    {
        value: 30,
        suffix: "+",
        label: "Influencer\nPartners",
        icon: (
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_389_169)">
                    <path d="M48.6544 26.9505V36.0063C48.6544 42.7209 43.2113 48.1641 36.4967 48.1641H32.5904C25.8743 48.1641 20.4312 42.7209 20.4312 36.0063V21.7595" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M29.1949 54.7395H25.826H19.4238C14.4852 54.7395 10.2351 58.2303 9.27622 63.0753L6.16479 78.8129H50.6943H62.9223" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M39.8923 54.7395H43.2612H49.6634C53.8398 54.7395 57.5244 57.237 59.1409 60.9386" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M48.655 35.539H50.5772C52.9486 35.539 54.8711 33.6165 54.8711 31.2451C54.8711 28.8737 52.9486 26.9512 50.5772 26.9512H48.655V35.539Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.4317 35.539H18.5095C16.1381 35.539 14.2156 33.6165 14.2156 31.2451C14.2156 28.8737 16.1381 26.9512 18.5095 26.9512H20.4317V35.539Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M12.6076 57.3042C11.258 55.344 7.56894 49.1855 9.63067 43.1004C12.1282 35.7298 7.73769 33.7306 9.01692 28.7356C9.27489 27.7301 9.62302 26.9054 10.0179 26.186" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M29.3618 6.4536C32.345 6.805 34.5426 7.44688 34.5426 7.44688C34.5426 7.44688 41.4711 5.42265 47.4251 6.58781C53.3806 7.75454 54.4598 12.5824 54.8706 17.8943C55.2813 23.2048 58.7893 23.7404 60.0686 28.7354C61.3478 33.7303 56.9589 35.7295 59.4564 43.1002C61.5181 49.1854 57.8289 55.3439 56.4795 57.304" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34.5435 30.2905V32.7833" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M34.8867 40.9676H34.547C32.2959 40.9676 30.4712 39.1428 30.4712 36.8918H38.9626C38.9624 39.1428 37.1376 40.9676 34.8867 40.9676Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M39.8921 47.6829V54.7394H43.261V57.9069C43.261 59.1877 42.2224 60.2279 40.9401 60.2279H28.1466C26.8643 60.2279 25.8257 59.1877 25.8257 57.9069V54.7394H29.1946V47.6829" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M27.6066 25.9605L23.892 21.443H8.50348C4.45439 21.443 1.17188 18.1605 1.17188 14.1114V8.51837C1.17188 4.46929 4.45439 1.18677 8.50348 1.18677H22.3254C26.3745 1.18677 29.657 4.46929 29.657 8.51837V25.2258C29.6569 26.3116 28.2961 26.7993 27.6066 25.9605Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.1167 7.1875H23.7122" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.1167 11.4307H23.7122" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M7.1167 15.6736H11.9426" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M63.3688 78.813H50.6938L55.0464 65.3794C55.0464 65.3794 56.5354 61.5995 58.8262 61.0268C60.1656 60.692 62.2099 59.6959 63.6767 58.926C64.588 58.4479 65.7044 58.9599 65.9366 59.9625L66.1568 60.9123L76.2043 59.219C77.2746 59.0387 78.3212 59.6482 78.6921 60.6684C79.1029 61.7982 78.5528 63.0514 77.4431 63.5136L64.4386 68.9302L63.9628 73.3249" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M76.2293 54.2099H67.3289C66.3731 54.2099 65.5984 53.4351 65.5984 52.4795V36.4277C65.5984 35.472 66.3732 34.6973 67.3289 34.6973H76.2293C77.1851 34.6973 77.9598 35.4721 77.9598 36.4277V52.4795C77.96 53.4352 77.1851 54.2099 76.2293 54.2099Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M74.5138 34.7229H69.0444V30.7968C69.0444 29.5892 70.0235 28.6101 71.2312 28.6101H72.3271C73.5347 28.6101 74.5138 29.5892 74.5138 30.7968V34.7229Z" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M65.5764 19.2939V23.12" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M67.4893 21.207H63.6631" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="71.3467" cy="15.6736" r="1.17188" fill="#1744FF" />
                    <path d="M1.17188 78.813H68.5759" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M30.4709 17.251C30.4709 17.251 37.0683 26.9502 48.6544 26.9502" stroke="#1744FF" strokeWidth="3" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_389_169">
                        <rect width="80" height="80" fill="white" />
                    </clipPath>
                </defs>
            </svg>

        ),
    },
];

// ─── Animated counter hook ────────────────────────────────────────────────────
const useCountUp = (target: number, duration = 2000, trigger = false) => {
    const [count, setCount] = useState(0);
    const started = useRef(false);

    useEffect(() => {
        if (!trigger || started.current) return;
        started.current = true;

        const start = performance.now();
        const step = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * target));
            if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
    }, [trigger, target, duration]);

    return count;
};

// ─── Single stat card ─────────────────────────────────────────────────────────
const StatCard = ({
    value,
    suffix,
    label,
    icon,
    inView,
}: {
    value: number;
    suffix: string;
    label: string;
    icon: React.ReactNode;
    inView: boolean;
}) => {
    const animated = useCountUp(value, 2000, inView);

    return (
        <div className="bg-transparent border border-primary p-6 sm:p-8 flex flex-col justify-between gap-4 size-full">
            {/* Icon */}
            <div className="text-primary">{icon}</div>
            {/* Number */}
            <p className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-primary leading-none tracking-tight">
                {animated.toLocaleString()}
                {suffix}
            </p>
            {/* Label */}
            <p className="sm:text-[30px] text-lg font-medium text-secondary leading-snug whitespace-pre-line">
                {label}
            </p>
        </div>
    );
};

// ─── Main component ───────────────────────────────────────────────────────────
const Numbers = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const el = sectionRef.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.3 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="numbers"
            className="relative bg-[#F7F7F8] rounded-2xl py-16 sm:py-20 px-6 sm:px-12 lg:px-20"
        >
            <div className="max-w-6xl mx-auto">
                {/* ── Header ── */}
                <div className="mb-12 sm:mb-16">
                    <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-secondary/50 uppercase block mb-3">
                        / Numbers
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tight">
                        We&apos;re{" "}
                        <em className="font-serif italic text-primary font-normal">Result</em>
                    </h2>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-secondary leading-tight tracking-tight">
                        Driven
                    </h2>
                </div>

                {/* ── Staggered 4×2 grid (desktop) / 2×2 grid (mobile) ── */}
                {/* Desktop: 4 columns, cards placed at [r1,c1], [r1,c3], [r2,c2], [r2,c4] */}
                {/* Mobile: simple 2-column grid */}
                <div className="hidden sm:grid grid-cols-4 grid-rows-2 ">
                    {/* Row 1, Col 1 */}
                    <div className="col-start-1 row-start-1">
                        <StatCard {...STATS[0]} inView={inView} />
                    </div>
                    {/* Row 1, Col 3 */}
                    <div className="col-start-3 row-start-1">
                        <StatCard {...STATS[1]} inView={inView} />
                    </div>
                    {/* Row 2, Col 2 */}
                    <div className="col-start-2 row-start-2">
                        <StatCard {...STATS[2]} inView={inView} />
                    </div>
                    {/* Row 2, Col 4 */}
                    <div className="col-start-4 row-start-2">
                        <StatCard {...STATS[3]} inView={inView} />
                    </div>
                </div>

                {/* Mobile: 4-row × 2-col grid, cards at [r1,c1], [r2,c2], [r3,c1], [r4,c2] */}
                <div className="sm:hidden grid grid-cols-2 grid-rows-4">
                    <div className="col-start-1 row-start-1">
                        <StatCard {...STATS[0]} inView={inView} />
                    </div>
                    <div className="col-start-2 row-start-2">
                        <StatCard {...STATS[1]} inView={inView} />
                    </div>
                    <div className="col-start-1 row-start-3">
                        <StatCard {...STATS[2]} inView={inView} />
                    </div>
                    <div className="col-start-2 row-start-4">
                        <StatCard {...STATS[3]} inView={inView} />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Numbers;
