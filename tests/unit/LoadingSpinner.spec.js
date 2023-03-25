import { mount } from "@vue/test-utils";
import LoadingSpinner from "@/components/atoms/LoadingSpinner.vue";

describe("LoadingSpinner", () => {
  it("renders correctly", () => {
    const wrapper = mount(LoadingSpinner);
    expect(wrapper.exists()).toBe(true);
  });

  it("applies the .spinner-container class", () => {
    const wrapper = mount(LoadingSpinner);
    const spinnerContainer = wrapper.find(".spinner-container");
    expect(spinnerContainer.exists()).toBe(true);
  });

  it('sets the role attribute of .spinner-border to "status"', () => {
    const wrapper = mount(LoadingSpinner);
    const spinnerBorder = wrapper.find(".spinner-border");
    expect(spinnerBorder.attributes("role")).toBe("status");
  });
});
