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
      <rect
        width={10}
        height={10}
        x={7}
        y={6}
        fill="currentColor"
        mask="url(#lineMdBeerAltLoop0)"
        opacity={0}
      >
        <set fill="freeze" attributeName="opacity" begin="0.7s" to={1}></set>
      </rect>
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
        d="M8 12L21 12M8 6L21 6M8 18L21 18M3 12L3 12"
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
        d="M3 12L21 12M3 6L21 6M3 18L21 18"
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
        d="M3 12L16 12M3 6L16 6M3 18L16 18M21 12L21 12"
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
        d="M3 12L21 12M3 6L21 6M3 18L21 18"
      ></path>
    </svg>
  );
}
