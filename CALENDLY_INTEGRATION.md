# Calendly Integration for Netspire Web Agency

## Overview

We've added a fully customized Calendly integration to the Netspire Web Agency website to streamline the booking process. The integration follows the website's theme and design language.

## Features

- **Custom Styling**: The Calendly widget matches the site's black and pink color scheme.
- **Seamless Integration**: Embedded directly in the contact section.
- **Loading Animation**: Custom loading state with a branded spinner.
- **Responsive Design**: Works perfectly on all device sizes.
- **Smooth Navigation**: "Book Now" buttons throughout the site link directly to the calendar.

## Customization Parameters

We've used the following URL parameters to style the Calendly widget:

- `background_color=050505` - Deep black background to match the website theme
- `text_color=ffffff` - White text for optimal readability
- `primary_color=FF1053` - Netspire pink for primary actions
- `accent_color=FF4778` - Lighter pink shade for accents
- `border_color=333333` - Dark gray for borders
- `font=Inter` - Using the same font as the website
- `hide_event_type_details=1` - Cleaner interface
- `hide_gdpr_banner=1` - Remove unnecessary banners
- `hide_landing_page_details=1` - Streamlined booking flow

## How to Update

If you need to make changes to the Calendly integration, edit the `src/components/ContactSection.tsx` file:

```tsx
<iframe
  src="https://calendly.com/netspirestudios/30min?background_color=050505&text_color=ffffff&primary_color=FF1053&hide_event_type_details=1&hide_gdpr_banner=1&accent_color=FF4778&hide_landing_page_details=1&border_color=333333&font=Inter"
  width="100%"
  height="100%"
  frameBorder="0"
  title="Schedule a meeting with Netspire"
  className="min-h-[650px] md:min-h-[650px] w-full"
  onLoad={handleCalendlyLoad}
></iframe>
```

## Additional Calendly Settings

For best results, you should also configure these settings in your Calendly account:

1. Set your availability to match your business hours
2. Configure email notifications for both you and your clients
3. Add custom questions to gather project requirements
4. Set up buffer time between meetings if needed 