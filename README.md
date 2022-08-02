# Magic Contact

Business card to digital contact with a picture.

## MVP

- Tesseract for OCR
- Django for database
  - Need "contact" model
    - "name" required, text
    - "phone" optional, text, verified format
    - "email" optional, text, verified format
    - "ext." optional, text
    - "company" optional, text
    - "position" optional, text
    - "other"
      - label, text
      - value, varies? files?
- React for frontend
  - Button to "take photo"
    - Camera permissions from the browser
  - "Processing" to display during OCR
    - Opportunity to test or correct for accuracy?

## Other features/thoughts

- Login?
- What format to save contacts?
  - Is it device dependant?
  - research iphone versus android contact format
