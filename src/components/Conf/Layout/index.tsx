import React from "react"

import "../../../assets/css/global.css"
import "../../../assets/css/style.less"

interface Props {
  children: React.ReactNode
}
const LayoutConf = ({ children }: Props): JSX.Element => (
  <>
    <div className="conf-style">{children}</div>
  </>
)

export default LayoutConf
