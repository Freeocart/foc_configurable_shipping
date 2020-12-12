import React, { useContext, useState, useEffect } from 'react'
import { ConfigContext } from './ConfigProvider'

export default function Output ({ outputName }) {
  const { state } = useContext(ConfigContext)
  const [ output, setOutput ] = useState(state)

  useEffect(() => {
    setOutput(JSON.stringify(state))
  }, [ state ])

  return <textarea className="Rules__output" name={ outputName } value={ output }></textarea>
}