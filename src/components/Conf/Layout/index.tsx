import React from "react"

import "../../../assets/css/style.less"
import "../../../assets/css/global.css"

interface Props {
  children: React.ReactNode
}
const LayoutConf = ({ children }: Props): JSX.Element => (
  <>
    <div className="conf-style">{children}</div>
  </>
)

export default LayoutConf
