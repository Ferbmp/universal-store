import { mount } from "@vue/test-utils";
import HomeBanner from "@/components/molecules/HomeBanner.vue";

describe("HomeBanner.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(HomeBanner);
  });

  it("renders the heading and the lead text", () => {
    const heading = wrapper.find("h1");
    const leadText = wrapper.find(".lead");

    expect(heading.text()).toBe("Welcome to Universal Store!");
    expect(leadText.text()).toBe("Check out our latest products below.");
  });
});
