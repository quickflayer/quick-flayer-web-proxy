// prettier-ignore

import React from 'react';
import type { SVGProps } from 'react';

export function LineMdMenu(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray={16}
        strokeDashoffset={16}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path d="M5 5h14">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path d="M5 12h14">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
        <path d="M5 19h14">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.4s"
            dur="0.2s"
            values="16;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function MdiClose(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
      ></path>
    </svg>
  );
}

export function MdiCircleOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8s8 3.59 8 8s-3.59 8-8 8m0-18C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2"
      ></path>
    </svg>
  );
}

export function LineMdMenuToCloseTransition(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19"
      >
        <animate
          fill="freeze"
          attributeName="d"
          dur="0.4s"
          values="M5 5L12 5L19 5M5 12H19M5 19L12 19L19 19;M5 5L12 12L19 5M12 12H12M5 19L12 12L19 19"
        ></animate>
      </path>
    </svg>
  );
}

export function LineMdCloseCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path
          strokeDasharray={8}
          strokeDashoffset={8}
          d="M12 12l4 4M12 12l-4 -4M12 12l-4 4M12 12l4 -4"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdPauseToPlayFilledTransition(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6"
      >
        <animate
          fill="freeze"
          attributeName="d"
          dur="0.6s"
          keyTimes="0;0.66;1"
          values="M9 18L7 18L7 6L9 6L9 18M15 6L17 6L17 18L15 18L15 6;M13 15L8 18L8 6L13 9L13 15M13 9L18 12L18 12L13 15L13 9;M13 15L8 18L8 6L13 9L13 9M13 9L18 12L18 12L13 15L13 15"
        ></animate>
      </path>
    </svg>
  );
}

export function LineMdSunnyLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={36}
          strokeDashoffset={36}
          d="M12 7c2.76 0 5 2.24 5 5c0 2.76 -2.24 5 -5 5c-2.76 0 -5 -2.24 -5 -5c0 -2.76 2.24 -5 5 -5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.5s"
            values="36;0"
          ></animate>
        </path>
        <path
          strokeDasharray={2}
          strokeDashoffset={2}
          d="M12 19v1M19 12h1M12 5v-1M5 12h-1"
          opacity={0}
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.6s"
            dur="0.2s"
            values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="2;0"
          ></animate>
          <set fill="freeze" attributeName="opacity" begin="0.6s" to={1}></set>
          <animateTransform
            attributeName="transform"
            dur="30s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
        <path
          strokeDasharray={2}
          strokeDashoffset={2}
          d="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5"
          opacity={0}
        >
          <animate
            fill="freeze"
            attributeName="d"
            begin="0.8s"
            dur="0.2s"
            values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="2;0"
          ></animate>
          <set fill="freeze" attributeName="opacity" begin="0.8s" to={1}></set>
          <animateTransform
            attributeName="transform"
            dur="30s"
            repeatCount="indefinite"
            type="rotate"
            values="0 12 12;360 12 12"
          ></animateTransform>
        </path>
      </g>
    </svg>
  );
}

export function LineMdSunnyOutlineToMoonAltLoopTransition(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeDasharray={4}
        strokeDashoffset={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1}
      >
        <path d="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5">
          <animate
            id="lineMdSunnyOutlineToMoonAltLoopTransition0"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+3.2s;lineMdSunnyOutlineToMoonAltLoopTransition0.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+1.8s"
            to="M12 5h1.5M12 5h-1.5M12 5v1.5M12 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+3.8s"
            to="M12 4h1.5M12 4h-1.5M12 4v1.5M12 4v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition0.begin+5.8s"
            to="M13 4h1.5M13 4h-1.5M13 4v1.5M13 4v-1.5"
          ></set>
        </path>
        <path d="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5">
          <animate
            id="lineMdSunnyOutlineToMoonAltLoopTransition1"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="1s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+4s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+3.2s;lineMdSunnyOutlineToMoonAltLoopTransition1.begin+5.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+1.8s"
            to="M17 11h1.5M17 11h-1.5M17 11v1.5M17 11v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+3.8s"
            to="M18 12h1.5M18 12h-1.5M18 12v1.5M18 12v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition1.begin+5.8s"
            to="M19 11h1.5M19 11h-1.5M19 11v1.5M19 11v-1.5"
          ></set>
        </path>
        <path d="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5">
          <animate
            id="lineMdSunnyOutlineToMoonAltLoopTransition2"
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="2.8s;lineMdSunnyOutlineToMoonAltLoopTransition2.begin+6s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+2s"
            dur="0.4s"
            values="4;0"
          ></animate>
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+1.2s;lineMdSunnyOutlineToMoonAltLoopTransition2.begin+3.2s"
            dur="0.4s"
            values="0;4"
          ></animate>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+1.8s"
            to="M20 5h1.5M20 5h-1.5M20 5v1.5M20 5v-1.5"
          ></set>
          <set
            fill="freeze"
            attributeName="d"
            begin="lineMdSunnyOutlineToMoonAltLoopTransition2.begin+5.8s"
            to="M19 4h1.5M19 4h-1.5M19 4v1.5M19 4v-1.5"
          ></set>
        </path>
      </g>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <g>
          <path
            strokeDasharray={2}
            strokeDashoffset={4}
            d="M12 21v1M21 12h1M12 3v-1M3 12h-1"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              dur="0.2s"
              values="4;2"
            ></animate>
          </path>
          <path
            strokeDasharray={2}
            strokeDashoffset={4}
            d="M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
          >
            <animate
              fill="freeze"
              attributeName="stroke-dashoffset"
              begin="0.2s"
              dur="0.2s"
              values="4;2"
            ></animate>
          </path>
          <set fill="freeze" attributeName="opacity" begin="0.5s" to={0}></set>
        </g>
        <path
          d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
          opacity={0}
        >
          <set fill="freeze" attributeName="opacity" begin="0.5s" to={1}></set>
        </path>
      </g>
      <mask id="lineMdSunnyOutlineToMoonAltLoopTransition3">
        <circle cx={12} cy={12} r={12} fill="#fff"></circle>
        <circle cx={12} cy={12} r={4}>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="4;8"
          ></animate>
        </circle>
        <circle cx={22} cy={2} r={3} fill="#fff">
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="3;12"
          ></animate>
        </circle>
        <circle cx={22} cy={2} r={1}>
          <animate
            fill="freeze"
            attributeName="cx"
            begin="0.1s"
            dur="0.4s"
            values="22;18"
          ></animate>
          <animate
            fill="freeze"
            attributeName="cy"
            begin="0.1s"
            dur="0.4s"
            values="2;6"
          ></animate>
          <animate
            fill="freeze"
            attributeName="r"
            begin="0.1s"
            dur="0.4s"
            values="1;10"
          ></animate>
        </circle>
      </mask>
      <circle
        cx={12}
        cy={12}
        r={6}
        mask="url(#lineMdSunnyOutlineToMoonAltLoopTransition3)"
        fill="currentColor"
      >
        <animate
          fill="freeze"
          attributeName="r"
          begin="0.1s"
          dur="0.4s"
          values="6;10"
        ></animate>
        <set fill="freeze" attributeName="opacity" begin="0.5s" to={0}></set>
      </circle>
    </svg>
  );
}

export function IcOutlineDashboard(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 5v2h-4V5zM9 5v6H5V5zm10 8v6h-4v-6zM9 17v2H5v-2zM21 3h-8v6h8zM11 3H3v10h8zm10 8h-8v10h8zm-10 4H3v6h8z"
      ></path>
    </svg>
  );
}

export function PajamasStageAll(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M8.75 3a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm0 4.25a.75.75 0 0 0 0 1.5h6.5a.75.75 0 0 0 0-1.5zm-.75 5a.75.75 0 0 1 .75-.75h6.5a.75.75 0 0 1 0 1.5h-6.5a.75.75 0 0 1-.75-.75M6.28 7.28a.75.75 0 0 0-1.06-1.06L2.5 8.94L1.28 7.72A.75.75 0 0 0 .22 8.78l1.75 1.75a.75.75 0 0 0 1.06 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
}

export function IcOutlineSecurity(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12c5.16-1.26 9-6.45 9-12V5zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11z"
      ></path>
    </svg>
  );
}

export function SvgSpinners3DotsMove(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={4} cy={12} r={0} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="r"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove0"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove1"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove0.end"
          dur="0.001s"
          values="20;4"
        ></animate>
      </circle>
      <circle cx={4} cy={12} r={3} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove2"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove3"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove2.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate
          fill="freeze"
          attributeName="cx"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
        <animate
          id="svgSpinners3DotsMove4"
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove5"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove4.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
      </circle>
      <circle cx={20} cy={12} r={3} fill="currentColor">
        <animate
          id="svgSpinners3DotsMove6"
          fill="freeze"
          attributeName="r"
          begin="0;svgSpinners3DotsMove1.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="3;0"
        ></animate>
        <animate
          id="svgSpinners3DotsMove7"
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove6.end"
          dur="0.001s"
          values="20;4"
        ></animate>
        <animate
          fill="freeze"
          attributeName="r"
          begin="svgSpinners3DotsMove7.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="0;3"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove5.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="4;12"
        ></animate>
        <animate
          fill="freeze"
          attributeName="cx"
          begin="svgSpinners3DotsMove3.end"
          calcMode="spline"
          dur="0.5s"
          keySplines=".36,.6,.31,1"
          values="12;20"
        ></animate>
      </circle>
    </svg>
  );
}

export function MynauiComponents(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M8.85 6.15L12 3l3.15 3.15L12 9.3zm5.85 6.3l3.15-3.15L21 12.45l-3.15 3.15zm-5.85 5.4L12 14.7l3.15 3.15L12 21zM3 12l3.15-3.15L9.3 12l-3.15 3.15z"
      ></path>
    </svg>
  );
}

export function EvaArrowUpFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M16.21 16H7.79a1.76 1.76 0 0 1-1.59-1a2.1 2.1 0 0 1 .26-2.21l4.21-5.1a1.76 1.76 0 0 1 2.66 0l4.21 5.1A2.1 2.1 0 0 1 17.8 15a1.76 1.76 0 0 1-1.59 1"
      ></path>
    </svg>
  );
}

export function EvaArrowDownFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 17a1.72 1.72 0 0 1-1.33-.64l-4.21-5.1a2.1 2.1 0 0 1-.26-2.21A1.76 1.76 0 0 1 7.79 8h8.42a1.76 1.76 0 0 1 1.59 1.05a2.1 2.1 0 0 1-.26 2.21l-4.21 5.1A1.72 1.72 0 0 1 12 17"
      ></path>
    </svg>
  );
}

export function MageSettings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
      >
        <path d="M12.132 15.404a3.364 3.364 0 1 0 0-6.728a3.364 3.364 0 0 0 0 6.728"></path>
        <path d="M20.983 15.094a9.4 9.4 0 0 1-1.802 3.1l-2.124-.482a7.25 7.25 0 0 1-2.801 1.56l-.574 2.079a9.5 9.5 0 0 1-1.63.149a9 9 0 0 1-2.032-.23l-.609-2.146a7.5 7.5 0 0 1-2.457-1.493l-2.1.54a9.4 9.4 0 0 1-1.837-3.33l1.55-1.722a7.2 7.2 0 0 1 .069-2.652L3.107 8.872a9.4 9.4 0 0 1 2.067-3.353l2.17.54A7.7 7.7 0 0 1 9.319 4.91l.574-2.124a9 9 0 0 1 2.17-.287c.585 0 1.17.054 1.745.16l.551 2.113c.83.269 1.608.68 2.296 1.217l2.182-.563a9.4 9.4 0 0 1 2.043 3.1l-1.48 1.607a7.4 7.4 0 0 1 .068 3.364z"></path>
      </g>
    </svg>
  );
}

export function IcBaselineSearch(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14"
      ></path>
    </svg>
  );
}

export function LineMdEdit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path strokeDasharray={20} strokeDashoffset={20} d="M3 21h18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.2s"
            values="20;0"
          ></animate>
        </path>
        <path
          strokeDasharray={48}
          strokeDashoffset={48}
          d="M7 17v-4l10 -10l4 4l-10 10h-4"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.6s"
            values="48;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M14 6l4 4">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdBeerAltLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <mask id="lineMdBeerAltLoop0">
        <g>
          <g>
            <path
              fill="none"
              stroke="#fff"
              strokeWidth={2}
              d="M18 23c-2 0 -3 2 -5 2c-2 0 -3 -2 -5 -2c-2 0 -3 2 -5 2c-2 0 -3 -2 -5 -2c-2 0 -3 2 -5 2"
            ></path>
            <animateMotion
              calcMode="linear"
              dur="3s"
              path="M0 0h10"
              repeatCount="indefinite"
            ></animateMotion>
          </g>
          <animateMotion
            fill="freeze"
            begin="0.7s"
            calcMode="linear"
            dur="0.3s"
            path="M0 0v-16"
          ></animateMotion>
        </g>
      </mask>
      <path
        fill="none"
        stroke="currentColor"
        strokeDasharray={64}
        strokeDashoffset={64}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M18 3l-2 18h-9l-2 -18Z"
      >
        <animate
          fill="freeze"
          attributeName="stroke-dashoffset"
          dur="0.6s"
          values="64;0"
        ></animate>
      </path>
      <path
        fill="currentColor"
        d="M18 3l-2 18h-9l-2 -18Z"
        mask="url(#lineMdBeerAltLoop0)"
      ></path>
    </svg>
  );
}

export function LineMdAlertCircle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M12 7v6">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
        <path strokeDasharray={2} strokeDashoffset={2} d="M12 17v0.01">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="2;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdCircleTwotoneToConfirmCircleTransition(
  props: SVGProps<SVGSVGElement>
) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          fill="currentColor"
          fillOpacity={0.3}
          d="M3 12c0 -4.97 4.03 -9 9 -9c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9Z"
        >
          <animate
            fill="freeze"
            attributeName="fill-opacity"
            dur="0.15s"
            values="0.3;0"
          ></animate>
        </path>
        <path strokeDasharray={14} strokeDashoffset={14} d="M8 12l3 3l5 -5">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.15s"
            dur="0.2s"
            values="14;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function StashPackLight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10 15.5H7a1.5 1.5 0 0 0 0 3h3a1.5 1.5 0 0 0 0-3M6.5 17a.5.5 0 0 1 .5-.5h3a.5.5 0 1 1 0 1H7a.5.5 0 0 1-.5-.5"
      ></path>
      <path
        fill="currentColor"
        d="M8.531 3.5c-.52 0-.88 0-1.218.096a2.5 2.5 0 0 0-.824.412c-.28.213-.496.5-.808.917L4.213 6.883c-.212.282-.358.477-.464.695a2.5 2.5 0 0 0-.203.609c-.046.238-.046.482-.046.834v7.8c0 .542 0 .98.029 1.333c.03.365.093.685.244.98a2.5 2.5 0 0 0 1.092 1.093c.296.151.616.214.98.244c.355.029.792.029 1.334.029h9.642c.542 0 .98 0 1.333-.029c.365-.03.685-.093.981-.244a2.5 2.5 0 0 0 1.092-1.092c.151-.296.214-.616.244-.98c.029-.355.029-.792.029-1.334v-7.8c0-.352 0-.596-.046-.834a2.5 2.5 0 0 0-.203-.609c-.106-.218-.252-.413-.463-.695l-1.47-1.958c-.311-.416-.527-.704-.807-.917a2.5 2.5 0 0 0-.824-.412c-.338-.096-.698-.096-1.218-.096zm-.943 1.058c.186-.054.396-.058 1.012-.058h1.834l-.375 3H5l1.44-1.92c.37-.493.5-.658.653-.775a1.5 1.5 0 0 1 .495-.247M13.941 7.5l-.375-3H15.4c.616 0 .826.004 1.012.058c.179.05.347.135.495.247c.154.117.284.282.653.775L19 7.5zm-1.382-3l.375 3h-1.868l.375-3zm.441 4v4a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-4zm-3 4a1.5 1.5 0 0 0 1.5 1.5h1a1.5 1.5 0 0 0 1.5-1.5v-4h5.489c.01.113.011.27.011.567V16.8c0 .568 0 .964-.026 1.273c-.024.302-.07.476-.137.608a1.5 1.5 0 0 1-.656.656c-.132.067-.306.113-.608.137c-.308.026-.705.026-1.273.026H7.2c-.568 0-.964 0-1.273-.026c-.302-.024-.476-.07-.608-.137a1.5 1.5 0 0 1-.655-.656c-.068-.132-.114-.306-.138-.608c-.026-.309-.026-.705-.026-1.273V9.067c0-.297.001-.454.011-.567H10z"
      ></path>
    </svg>
  );
}

export function SvgSpinnersBlocksShuffle3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <rect width={10} height={10} x={1} y={1} fill="#FFCB05" rx={1}>
        <animate
          id="svgSpinnersBlocksShuffle30"
          fill="freeze"
          attributeName="x"
          begin="0;svgSpinnersBlocksShuffle3b.end"
          dur="0.2s"
          values="1;13"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle31"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle38.end"
          dur="0.2s"
          values="1;13"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle32"
          fill="freeze"
          attributeName="x"
          begin="svgSpinnersBlocksShuffle39.end"
          dur="0.2s"
          values="13;1"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle33"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle3a.end"
          dur="0.2s"
          values="13;1"
        ></animate>
      </rect>
      <rect width={10} height={10} x={1} y={13} fill="#FFCB05" rx={1}>
        <animate
          id="svgSpinnersBlocksShuffle34"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle30.end"
          dur="0.2s"
          values="13;1"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle35"
          fill="freeze"
          attributeName="x"
          begin="svgSpinnersBlocksShuffle31.end"
          dur="0.2s"
          values="1;13"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle36"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle32.end"
          dur="0.2s"
          values="1;13"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle37"
          fill="freeze"
          attributeName="x"
          begin="svgSpinnersBlocksShuffle33.end"
          dur="0.2s"
          values="13;1"
        ></animate>
      </rect>
      <rect width={10} height={10} x={13} y={13} fill="#FFCB05" rx={1}>
        <animate
          id="svgSpinnersBlocksShuffle38"
          fill="freeze"
          attributeName="x"
          begin="svgSpinnersBlocksShuffle34.end"
          dur="0.2s"
          values="13;1"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle39"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle35.end"
          dur="0.2s"
          values="13;1"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle3a"
          fill="freeze"
          attributeName="x"
          begin="svgSpinnersBlocksShuffle36.end"
          dur="0.2s"
          values="1;13"
        ></animate>
        <animate
          id="svgSpinnersBlocksShuffle3b"
          fill="freeze"
          attributeName="y"
          begin="svgSpinnersBlocksShuffle37.end"
          dur="0.2s"
          values="1;13"
        ></animate>
      </rect>
    </svg>
  );
}

export function HugeiconsPokemon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        color="currentColor"
      >
        <path d="M12 21c4.418 0 8-1.79 8-4c0-.977-.84-1.532-1.052-2.411c-.12-.496.052-1.078.052-1.589a7 7 0 0 0-.751-3.158C20.126 8.212 22 5.606 22 3c-4.153 0-6.257 2.35-6.9 3.722a7.06 7.06 0 0 0-6.2 0C8.257 5.349 6.153 3 2 3c0 2.606 1.874 5.213 3.751 6.842A7 7 0 0 0 5 13c0 .511.172 1.093.053 1.589C4.84 15.468 4 16.023 4 17c0 2.21 3.582 4 8 4"></path>
        <path d="M11 16c.793.66 1.206.674 2 0m-4-3.5h-.009m6.017 0h-.009m-9.891 1.523c1.254.402 3.085 2.709.677 4.915m13.107-4.895c-1.254.4-3.084 2.708-.677 4.914"></path>
      </g>
    </svg>
  );
}

export function MdiPokeball(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2a10 10 0 0 1 10 10a10 10 0 0 1-10 10A10 10 0 0 1 2 12A10 10 0 0 1 12 2m0 2c-4.08 0-7.45 3.05-7.94 7h4.07c.44-1.73 2.01-3 3.87-3s3.43 1.27 3.87 3h4.07c-.49-3.95-3.86-7-7.94-7m0 16c4.08 0 7.45-3.05 7.94-7h-4.07c-.44 1.73-2.01 3-3.87 3s-3.43-1.27-3.87-3H4.06c.49 3.95 3.86 7 7.94 7m0-10a2 2 0 0 0-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
      ></path>
    </svg>
  );
}

export function RiResetLeftFill(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12S6.477 2 12 2v2a8 8 0 1 0 5.135 1.865L15 8V2h6l-2.447 2.447A9.98 9.98 0 0 1 22 12"
      ></path>
    </svg>
  );
}

export function IcOutlineMale(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M9.5 11c1.93 0 3.5 1.57 3.5 3.5S11.43 18 9.5 18S6 16.43 6 14.5S7.57 11 9.5 11m0-2C6.46 9 4 11.46 4 14.5S6.46 20 9.5 20s5.5-2.46 5.5-5.5c0-1.16-.36-2.23-.97-3.12L18 7.42V10h2V4h-6v2h2.58l-3.97 3.97C11.73 9.36 10.66 9 9.5 9"
      ></path>
    </svg>
  );
}

export function IcOutlineFemale(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M17.5 9.5C17.5 6.46 15.04 4 12 4S6.5 6.46 6.5 9.5c0 2.7 1.94 4.93 4.5 5.4V17H9v2h2v2h2v-2h2v-2h-2v-2.1c2.56-.47 4.5-2.7 4.5-5.4m-9 0C8.5 7.57 10.07 6 12 6s3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5"
      ></path>
    </svg>
  );
}

export function TablerCards(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="m3.604 7.197l7.138-3.109a.96.96 0 0 1 1.27.527l4.924 11.902a1 1 0 0 1-.514 1.304L9.285 20.93a.96.96 0 0 1-1.271-.527L3.09 8.5a1 1 0 0 1 .514-1.304zM15 4h1a1 1 0 0 1 1 1v3.5M20 6q.396.168.768.315a1 1 0 0 1 .53 1.311L19 13"
      ></path>
    </svg>
  );
}

export function LineMdMenuFoldLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5L19 5L19 19L12 19M12 12L19 12"
      ></path>
    </svg>
  );
}

export function LineMdMenuUnfoldLeft(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5L19 5L19 19L12 19M12 12L19 12M12 12L5 12"
      ></path>
    </svg>
  );
}

export function LineMdMenuFoldRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5L5 5L5 19L12 19M12 12L5 12"
      ></path>
    </svg>
  );
}

export function LineMdMenuUnfoldRight(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5L5 5L5 19L12 19M12 12L5 12M12 12L19 12"
      ></path>
    </svg>
  );
}

export function IcOutlinePerson(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 5c1.66 0 3 1.34 3 3s-1.34 
        3-3 3s-3-1.34-3-3s1.34-3 3-3"
      ></path>
    </svg>
  );
}

export function IcOutlineSettings(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19.43 12.98c.04-.32.07-.64.07-.98c0-.34-.03-.66-.07-1c-.2-.92-1.13-1.64-2.09-1.64H8.98v3.88h5.45c.32 0
        .64.14.88.4.24.24.37.56.37.91s-.13.67-.37.91c-.24.24-.56.37-.91.37H6.73c-1.24 0-2.26-1.02-2.26-2.26V6
        c0-1.24 1.02-2.26 2.26-2.26h3.88c.32 0 .64.14.88.4.24.24.37.56.37.91s-.13.67-.37.91c-.24.24-.56.37-.91
        .37H4.82C3.89 6 3.07 6.92 3.07 8v4c0 1.08.89 2 2.03 2h5.45v3.88h3.88z"
      ></path>
    </svg>
  );
}

export function IcOutlinePeople(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10s10-4.48 10-10S17.52 2 12 2m0 5c1.66 0 3 1.34 3 3s-1.34 
        3-3 3s-3-1.34-3-3s1.34-3 3-3m0 10c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4z"
      ></path>
    </svg>
  );
}

export function IcOutlineLogout(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M10.09 15.59L11.5 17l5-5-5-5-1.41 1.41L12.67 11H3v2h9.67l-2.58 2.59z"
      ></path>
    </svg>
  );
}

export function IcOutlineAssessment(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-8 14H9v-4H7v4H5V9h2v
        4h2V9h2v6z"
      ></path>
    </svg>
  );
}

export function LineMdAlertTriangle(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path strokeDasharray={64} strokeDashoffset={64} d="M12 3l9 17H3z">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path strokeDasharray={6} strokeDashoffset={6} d="M12 10v4">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="6;0"
          ></animate>
        </path>
        <path strokeDasharray={2} strokeDashoffset={2} d="M12 17v0.01">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="2;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdDocumentRemove(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M13 3L19 9V21H5V3H13"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path strokeDasharray={14} strokeDashoffset={14} d="M12.5 3V8.5H19">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.7s"
            dur="0.2s"
            values="14;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M9 14h6">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.9s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdRotate270(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={64}
          strokeDashoffset={64}
          d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="64;0"
          ></animate>
        </path>
        <path strokeDasharray={8} strokeDashoffset={8} d="M12 8v8">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.2s"
            values="8;0"
          ></animate>
        </path>
        <path strokeDasharray={6} strokeDashoffset={6} d="M15 13l-3 3l-3 -3">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.8s"
            dur="0.2s"
            values="6;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function IcOutlineHome(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81zM12 3L2 12h3v8h6v-6h2v6h6v-8h3z"
      ></path>
    </svg>
  );
}

export function IcOutlineArrowBack(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M20 11H7.83l5.59-5.59L12 4l-8 8l8 8l1.41-1.41L7.83 13H20z"
      ></path>
    </svg>
  );
}

export function SvgSpinnersRingResize(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        d="M12 1a11 11 0 1 0 11 11A11 11 0 0 0 12 1Zm0 19a8 8 0 1 1 8-8a8 8 0 0 1-8 8Z"
        opacity={0.25}
      ></path>
      <path
        fill="currentColor"
        d="M12 4a8 8 0 0 1 7.89 6.7a1.53 1.53 0 0 0 1.49 1.3a1.5 1.5 0 0 0 1.48-1.75a11 11 0 0 0-21.72 0A1.5 1.5 0 0 0 2.62 12a1.53 1.53 0 0 0 1.49-1.3A8 8 0 0 1 12 4Z"
      >
        <animateTransform
          attributeName="transform"
          dur="0.75s"
          repeatCount="indefinite"
          type="rotate"
          values="0 12 12;360 12 12"
        ></animateTransform>
      </path>
    </svg>
  );
}

export function SvgSpinners3DotsBounce(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={4} cy={12} r={3} fill="currentColor">
        <animate
          id="svgSpinners3DotsBounce0"
          attributeName="cy"
          begin="0;svgSpinners3DotsBounce1.end+0.25s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          keyTimes="0;.5;1"
          values="12;6;12"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={3} fill="currentColor">
        <animate
          attributeName="cy"
          begin="svgSpinners3DotsBounce0.begin+0.1s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          keyTimes="0;.5;1"
          values="12;6;12"
        ></animate>
      </circle>
      <circle cx={20} cy={12} r={3} fill="currentColor">
        <animate
          id="svgSpinners3DotsBounce1"
          attributeName="cy"
          begin="svgSpinners3DotsBounce0.begin+0.2s"
          calcMode="spline"
          dur="0.6s"
          keySplines=".33,.66,.66,1;.33,0,.66,.33"
          keyTimes="0;.5;1"
          values="12;6;12"
        ></animate>
      </circle>
    </svg>
  );
}

export function SvgSpinnersPulse3(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <circle cx={12} cy={12} r={0} fill="currentColor">
        <animate
          attributeName="r"
          begin="0;svgSpinnersPulse30.end-0.5s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="0;11"
        ></animate>
        <animate
          attributeName="opacity"
          begin="0;svgSpinnersPulse30.end-0.5s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="1;0"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={0} fill="currentColor">
        <animate
          attributeName="r"
          begin="svgSpinnersPulse30.begin+0.4s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="0;11"
        ></animate>
        <animate
          attributeName="opacity"
          begin="svgSpinnersPulse30.begin+0.4s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="1;0"
        ></animate>
      </circle>
      <circle cx={12} cy={12} r={0} fill="currentColor">
        <animate
          id="svgSpinnersPulse30"
          attributeName="r"
          begin="svgSpinnersPulse30.begin+0.8s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="0;11"
        ></animate>
        <animate
          attributeName="opacity"
          begin="svgSpinnersPulse30.begin+0.8s"
          calcMode="spline"
          dur="2s"
          keySplines="0,0.2,0.8,1"
          keyTimes="0;1"
          values="1;0"
        ></animate>
      </circle>
    </svg>
  );
}

export function LineMdCloudOffOutlineLoop(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={20}
          strokeDashoffset={20}
          d="M12 17.5c-6.6 0 -6.6 -6 0 -6c6.6 0 6.6 6 0 6Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.3s"
            values="20;0"
          ></animate>
        </path>
        <path
          strokeDasharray={15}
          strokeDashoffset={15}
          d="M8 12c0 -3 2.5 -5 5.5 -5c2.6 0 4.8 1.9 5.4 4.5"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.3s"
            dur="0.3s"
            values="15;0"
          ></animate>
        </path>
        <path strokeDasharray={12} strokeDashoffset={12} d="M3 3l18 18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.6s"
            dur="0.3s"
            values="12;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}

export function LineMdWifiOffOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      {...props}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      >
        <path
          strokeDasharray={50}
          strokeDashoffset={50}
          d="M12 20.5c-8 0 -8 -6 0 -6s8 6 0 6Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            dur="0.6s"
            values="50;0"
          ></animate>
        </path>
        <path
          strokeDasharray={26}
          strokeDashoffset={26}
          d="M12 16.5c-5.5 0 -7.5 -4 0 -4s5.5 4 0 4Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.1s"
            dur="0.4s"
            values="26;0"
          ></animate>
        </path>
        <path
          strokeDasharray={20}
          strokeDashoffset={20}
          d="M12 12.5c-3.5 0 -4.5 -2.5 0 -2.5s3.5 2.5 0 2.5Z"
        >
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.2s"
            dur="0.3s"
            values="20;0"
          ></animate>
        </path>
        <path strokeDasharray={12} strokeDashoffset={12} d="M3 3l18 18">
          <animate
            fill="freeze"
            attributeName="stroke-dashoffset"
            begin="0.5s"
            dur="0.3s"
            values="12;0"
          ></animate>
        </path>
      </g>
    </svg>
  );
}
