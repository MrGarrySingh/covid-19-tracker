import React from "react";
import { Card, CardContent, Typography } from "@material-ui/core";

import "./InfoBox.css";

const InfoBox = ({ title, value, total }) => {
  return (
    <div className="infoBox">
      <Card className="infoBox__card">
        <CardContent>
          <Typography variant="h6" component="h1">
            {title}
          </Typography>
          <Typography>{value}</Typography>
          <Typography color="textSecondary">Total: {total}</Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoBox;
