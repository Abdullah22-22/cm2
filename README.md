# React Jobs Project


## Usage

 
### Mock Server

1. Open a terminal in the `backend/api-fake-server` directory

2. Install Dependencies

```bash
npm install
```

3. Start the JSON-Server

```bash
npm run dev
```

4. The server will run on http://localhost:8000

### Frontend-simplified and/or Frontend

1. Open another terminal in the `frontend` directory (or `frontend-simplified`)

2. Install Dependencies 

```bash
npm install
```

3. Start the App

```bash
npm run dev
```

React will run on http://localhost:3000


### Api Server

1. Open another terminal in the `backend/api-server-starter` directory

2. Install Dependencies

```bash
npm install
```

3. Start the Server

```bash
npm run dev
```

4. The server will run on http://localhost:4000

---
## Other

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### About 
This is the jobs listing project based on the [YouTube crash course](https://youtu.be/LDB4uaJ87e0).

<img src="./frontend/public/screen.png" />


# Code Explanation

    jobSchema.set('toJSON', {
    virtuals: true,
	// include virtual properties in JSON file
	// virtuals are not stored in mongodb and are created dynamically

    transform: (doc, ret) => {
	// Create a new field called id from _id
	// because frontend expects id instead of _id
	// then delete _id and version key __v
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
	// and finally returns the new object with those fields
	// deleted
        return ret;
    }
    });
