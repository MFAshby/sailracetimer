import React, { PureComponent } from 'react'

import PersonIcon from './icons/PersonIcon.js'
import BoatIcon  from './icons/BoatIcon.js'
import ClassIcon  from './icons/ClassIcon.js'
import RaceIcon  from './icons/RaceIcon.js'
import Logo  from './icons/Logo.js'
import Laser from './icons/Laser.js'
import Ic420 from './icons/ic420.js'
import Comet from './icons/Comet.js'
import Enterprise from './icons/Enterprise.js'
import Finn from './icons/Finn.js'
import Fireball from './icons/Fireball.js'
import GP14 from './icons/GP14.js'
import Moth from './icons/Moth.js'
import Topper from './icons/Topper.js'

export default class Icon extends PureComponent {
    render() {
        let wh = {
            width: this.props.width || 90, 
            height: this.props.height || 90
        }
        switch(this.props.name) {
            case "logo": 
                return <Logo {...wh}/>
            case "person": 
                return <PersonIcon {...wh}/>
            case "class": 
                return <ClassIcon {...wh}/>
            case "boat": 
                return <BoatIcon {...wh}/>
            case "race": 
                return <RaceIcon {...wh}/>
            case "laser":
                return <Laser {...wh}/>
            case "420":
                return <Ic420 {...wh}/>
            case "comet":
                return <Comet {...wh}/>
            case "enterprise":
                return <Enterprise {...wh}/>
            case "finn":
                return <Finn {...wh}/>
            case "fireball":
                return <Fireball {...wh}/>
            case "gp14":
                return <GP14 {...wh}/>
            case "moth":
                return <Moth {...wh}/>
            case "topper":
                return <Topper {...wh}/>
            default:
                return <PersonIcon {...wh}/>
        }
    }
}