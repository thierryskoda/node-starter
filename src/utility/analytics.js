import Mixpanel from 'mixpanel'

const mixpanel = Mixpanel.init(process.env.MIXPANEL_TOKEN)

export function trackEvent(payload, user) {
  if (process.env.NODE_ENV === 'production') {
    payload = payload.toUpperCase()

    // MIXPANEL
    mixpanel.track(payload.toUpperCase(), {
      distinct_id: user.messenger.id,
    })
  }
}
