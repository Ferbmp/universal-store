import { mount } from "@vue/test-utils";
import BaseSelect from "@/components/atoms/BaseSelect.vue";

describe("BaseSelect.vue", () => {
  let wrapper;
  const optionsMock = [
    { value: "option1", label: "Option 1" },
    { value: "option2", label: "Option 2" },
    { value: "option3", label: "Option 3" },
  ];

  const initialProps = {
    name: "testSelect",
    label: "Test Select",
    options: optionsMock,
  };

  beforeEach(() => {
    wrapper = mount(BaseSelect, {
      props: initialProps,
    });
  });

  it("renders the label and select element", () => {
    const label = wrapper.find("label");
    const select = wrapper.find("select");

    expect(label.text()).toBe(initialProps.label);
    expect(select.attributes("name")).toBe(initialProps.name);
  });

  it("renders the correct options", () => {
    const optionElements = wrapper.findAll("option");

    expect(optionElements.length).toBe(optionsMock.length + 1);
    optionElements.forEach((option, index) => {
      if (index === 0) {
        expect(option.attributes("value")).toBe("");
        expect(option.element.disabled).toBe(true);
      } else {
        const mockOption = optionsMock[index - 1];
        expect(option.attributes("value")).toBe(mockOption.value);
        expect(option.text()).toBe(mockOption.label);
      }
    });
  });

  it("emits an input event with the selected value", async () => {
    const select = wrapper.find("select");
    const newValue = "option2";

    await select.setValue(newValue);

    expect(wrapper.emitted("input")).toBeTruthy();
    expect(wrapper.emitted("input")[0]).toEqual([newValue]);
  });
});
