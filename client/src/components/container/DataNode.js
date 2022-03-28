import React from 'react'
import PropTypes from 'prop-types'
// import '../../stylesheet/DataNode.css'

//css for nodes in dsa like queues
const DataNode = ({data='', x=10, y=20, width=60, height=50, color='turquoise', key = 1, className="DataNode", border="teal", ani_dur="2s", ani_delay='1s'}) => {
  return (
    [<rect className={className} key={key} x={x} y={y} width={width} height={height} style={{animationDuration: ani_dur, animationDelay: ani_delay, "fill": color, "stroke":border, "strokeWidth":'1.2px'}}>
      <title>{data}</title>
    </rect>,
    <text className={className} key={-1*key} x={x+2} y={y+height/2+5} width={width} height={20} style={{animationDuration: ani_dur, animationDelay: ani_delay}}>
      {data.substring(0,6)}
      <title>{data}</title>
    </text>]
  )
}

DataNode.propTypes = {
  data : PropTypes.string
}

export default DataNode