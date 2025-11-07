export interface CheckboxIconProps extends React.SVGProps<SVGSVGElement> {
  checked: boolean
}
export function CheckboxIcon({ checked, ...rest }: CheckboxIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      {...rest}
    >
      {!checked ? (
        <>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.5 2.5H4.16667H15.8333H17.5V17.5H15.8333H4.16667H2.5V2.5ZM15.8333 15.8333V4.16667H4.16667V15.8333H15.8333Z"
          />
        </>
      ) : (
        <g className="[&>path]:fill-neu-0">
          <rect x="2" y="3" width="15" height="15" />
          <path d="M6 10.3333H7.66667V12H6V10.3333Z" />
          <path d="M7.66667 12H9.33333V13.6667H7.66667V12Z" />
          <path d="M9.33333 10.3333H11V12H9.33333V10.3333Z" />
          <path d="M11 8.66667H12.6667V10.3333H11V8.66667Z" />
          <path d="M12.6667 7H14.3333V8.66667H12.6667V7Z" />
        </g>
      )}
    </svg>
  )
}
