export interface RadioIconProps extends React.SVGProps<SVGSVGElement> {
  checked?: boolean
}

export function RadioIcon({ checked, ...rest }: RadioIconProps) {
  return (
    <svg
      fill="currentColor"
      viewBox="0 0 24 24"
      {...rest}
      {...(checked ? { "data-checked": "" } : {})}
    >
      <path d="M17 3H7v2H5v2H3v10h2v2h2v2h10v-2h2v-2h2V7h-2V5h-2V3zm0 2v2h2v10h-2v2H7v-2H5V7h2V5h10z" />
      <path
        d="M8 11h2v2h2v2h-2v-2H8v-2zm8-2h-2v2h-2v2h2v-2h2V9z"
        className="fill-transparent [[data-checked]_&]:fill-current [[data-unchecked]:hover_&]:opacity-70 [label:hover_&]:fill-current"
      />
    </svg>
  )
}
