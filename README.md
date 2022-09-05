# Magic Contact

Business card to digital contact with a picture.

## MVP

- [ ] Tesseract for OCR
- [x] Django for database
  - [x] Need "contact" model
    - "name" required, text
    - "phone" optional, text, verified format
    - "email" optional, text, verified format
    - "ext." optional, text
    - "company" optional, text
    - "position" optional, text
    - "other"
      - label, text
      - value, varies? files?
- [x] React for frontend
  - [x] Button to "take photo"
    - [x] Camera permissions from the browser
  - [ ] "Processing" to display during OCR
    - Opportunity to test or correct for accuracy?

## Other features/thoughts

- Login?
- What format to save contacts?
  - Is it device dependant?
  - research iphone versus android contact format

## Development

Install the python dependencies with `pip install -r requirements.txt`

To start the backend of the application, navigate to the `backend` folder and run `python manage.py runserver`. You might need to `python manage.py makemigrations` and `python manage.py migrate` to build the database initially.

To test with a mobile device, you must add your server's IP address to `/backend/backend/settings.py` under `ALLOWED_HOST`. Use the `ipconfig` command to get your local server's IP address. After you've added your IP, you should be able to hit the API endpoint and upload photos (tested from an Android camera).

To test the image upload API, navigate to `:8000/api/upload/`

Install node dependencies with `npm i`

To start the frontend of the application, navigate to the `frontend` folder and run `npm start` to initiate the development server.
