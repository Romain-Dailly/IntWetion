import React from "react";
import { shallow } from "enzyme";
import checkPropTypes from "check-prop-types";
import Home from "./Home";

describe("HOME Component", () => {
  test("should be rendered without error ", () => {
    shallow(<Home />);
  });
});
