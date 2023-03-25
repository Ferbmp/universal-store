import { mount } from "@vue/test-utils";
import StarRating from "@/components/atoms/StarRating.vue";

describe("StarRating", () => {
  it("renders the correct number of stars", () => {
    const wrapper = mount(StarRating, {
      props: {
        maxStars: 3,
      },
    });

    const stars = wrapper.findAll(".bi-star-fill");
    expect(stars.length).toBe(3);
  });

  it("fills the stars according to the rating prop", () => {
    const wrapper = mount(StarRating, {
      props: {
        rating: 3,
      },
    });

    const activeStars = wrapper.findAll(".bi-star-fill.active");
    expect(activeStars.length).toBe(3);
  });
});
