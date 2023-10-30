# <p align="center"> Öffis </p>

### <p align="center"> The navigation system created for public transport. </p>

## <p align="center"> [About](#about)&nbsp; • &nbsp;[Features](#features)&nbsp; • &nbsp;[Getting Started](#getting-started)&nbsp; • &nbsp;[Dependencies](#dependencies)&nbsp; • &nbsp;[Contact](#contact)&nbsp; • &nbsp;[Licence](#license)</p>

---

## About

Öffis is a hybrid app for Android iOS and web that provides help travelling with public transport. Therefore, it offers
more functions than a simple route planner. With this app travelling is as easy as by car. Enter the goal and get
started.

## Features

-   new features will be added soon

## Getting started

1.  Clone the repo:

         git clone https://github.com/Oeffis/Oeffis.git

2. Install NPM packages (stick to the order because backend depends on vrr_client):

        cd /vrr_client
        npm install

        cd /backend
        npm install

        cd /frontend
        npm install

3.  Get Nest.js CLI:

        npm i -g @nestjs/cli

4.  Get Ionic CLI:

        npm install -g @ionic/cli

5.  Run the project in your IDE

## Dependencies

Needed dependencies will be listed here:

-   install Node.js Version 18
-   Docker

## Importing and using the database

1. Make sure to delete the current database in the `.localdev` folder if it exists.
2. Remove all files fro mthe `schema` folder.
3. Download the latest dump from [https://dumps.oeffis.0209.cloud/](https://dumps.oeffis.0209.cloud/).
4. Place the dump in the `schema` folder.
5. Run `docker-compose up` to start the database.

## Updating the generated Client

To update the frontends client for the backends api use the
`./update_fronte_api_client.sh` script. This script will require
you to have docker installed. It will use the `backend/swagger-spec.json`
as input.

```bash
./update_fronte_api_client.sh
```

After that the client will be updated and you can commit the changes.

## Contact

Open a discussion and tag core-team (@Oeffis/core-team).

## License

See LICENSE file for more information or visit [Gnu.org](https://choosealicense.com/licenses/agpl-3.0/) .
