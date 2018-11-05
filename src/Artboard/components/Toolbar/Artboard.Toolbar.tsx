import * as React from 'react'
import {connect} from 'react-redux'
import * as actions from '../../Artboard.actions'
import {
  ToolbarWrapperUI,
  ToolbarLeftUI,
  ToolbarRightUI,
} from '../../Artboard.css'
import Toolbar from './Toolbar'
import ToolbarButton from './ToolbarButton'

export class ArtboardToolbar extends React.PureComponent<any> {
  toggleDarkMode = event => {
    event.stopPropagation()
    this.props.toggleDarkMode()
  }

  toggleGuides = event => {
    event.stopPropagation()
    this.props.toggleGuides()
  }

  toggleBoxInspector = event => {
    event.stopPropagation()
    this.props.toggleBoxInspector()
  }

  toggleSizeInspector = event => {
    event.stopPropagation()
    this.props.toggleSizeInspector()
  }

  startEyeDropper = event => {
    this.props.startEyeDropper()
  }

  toggleCrosshair = event => {
    event.stopPropagation()
    this.props.toggleCrosshair()
  }

  handleClearSnapshots = event => {
    event.stopPropagation()
    this.props.clearCrosshairSnapshots()
  }

  resetSettings = event => {
    event.stopPropagation()
    this.props.resetSettings()
  }

  render() {
    const {
      darkMode,
      showBoxInspector,
      showSizeInspector,
      showGuides,
      isCrosshairActive,
    } = this.props

    return (
      <ToolbarWrapperUI>
        <Toolbar>
          <ToolbarLeftUI>
            <ToolbarButton
              onClick={this.toggleDarkMode}
              label="Dark Mode"
              icon="Moon"
              isActive={darkMode}
            />
          </ToolbarLeftUI>
          <ToolbarButton
            onClick={this.toggleGuides}
            label="Guides"
            icon="Ruler"
            isActive={showGuides}
          />
          <ToolbarButton
            onClick={this.toggleBoxInspector}
            label="Box Inspector"
            icon="Box"
            isActive={showBoxInspector}
          />
          <ToolbarButton
            onClick={this.toggleSizeInspector}
            label="Size Inspector"
            icon="Size"
            isActive={showSizeInspector}
          />
          <ToolbarButton
            onClick={this.startEyeDropper}
            label="Color"
            icon="EyeDropper"
          />
          <ToolbarButton
            onClick={this.toggleCrosshair}
            label="Crosshair"
            icon="Crosshair"
            isActive={isCrosshairActive}
          />
          <ToolbarRightUI>
            <ToolbarButton
              onClick={this.handleClearSnapshots}
              label="Clear Crosshairs"
              icon="Eraser"
            />
            <ToolbarButton
              onClick={this.resetSettings}
              label="Reset"
              icon="Refresh"
            />
          </ToolbarRightUI>
        </Toolbar>
      </ToolbarWrapperUI>
    )
  }
}

const mapStateToProps = state => {
  const {
    darkMode,
    showBoxInspector,
    showSizeInspector,
    showGuides,
    isCrosshairActive,
  } = state

  return {
    darkMode,
    showBoxInspector,
    showSizeInspector,
    showGuides,
    isCrosshairActive,
  }
}

const mapDispatchToProps = {
  toggleDarkMode: actions.toggleDarkMode,
  toggleGuides: actions.toggleGuides,
  toggleBoxInspector: actions.toggleBoxInspector,
  toggleSizeInspector: actions.toggleSizeInspector,
  toggleCrosshair: actions.toggleCrosshair,
  startEyeDropper: actions.startEyeDropper,
  resetSettings: actions.resetSettings,
  clearCrosshairSnapshots: actions.clearCrosshairSnapshots,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ArtboardToolbar)
