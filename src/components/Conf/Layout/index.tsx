import React from "react"

import "../../../assets/css/style.less"

interface Props {
  children: React.ReactNode
  className?: string
}
const LayoutConf = ({ children, className }: Props): JSX.Element => (
  <>
    <div className={className}>{children}</div>
  </>
)

export default LayoutConf
