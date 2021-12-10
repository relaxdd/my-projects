const corsOptions = {
  allowedHeaders: ["Origin", "Content-Type", "Accept", "Authorization"],
  methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 200
};

export default corsOptions;
