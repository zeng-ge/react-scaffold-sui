import App from 'features/app'
import { FEATURES } from '../constants'

export default function() {
  return {
    [FEATURES.APP]: App,
  }
}

