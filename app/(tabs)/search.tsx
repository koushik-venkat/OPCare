import { View, ScrollView, StyleSheet } from "react-native";
import SearchBar from "@/components/searchBar";
import FilterTabs from "@/components/searchtab/filterTabs";
import DoctorList from "@/components/searchtab/doctorsList";
import HospitalList from "@/components/searchtab/hospoitalList";
import { getAllDoctors } from "@/config/SampleData/doctors";

const MOCK_DOCTORS = getAllDoctors();


const MOCK_HOSPITALS = [
  {
    id: "1",
    name: "Apollo Hospital",
    specialization: "Multispecialty",
    rating: 4.9,
    reviews: 250,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvDB9XQ34VYJlltnW48Sg_8DDHAj34BQW_rg&s",
  },
  {
    id: "2",
    name: "Fortis Hospital",
    specialization: "Cardiology, Neurology",
    rating: 4.7,
    reviews: 180,
    image: "https://clinicsoncall.com/wp-content/uploads/2021/05/bolnicza-fortis-bangalor-korpus.jpg",
  },
  {
    id: "3",
    name: "AIIMS",
    specialization: "Government Hospital",
    rating: 4.8,
    reviews: 300,
    image: "https://static.theprint.in/wp-content/uploads/2020/07/AIIMS-2.jpg",
  },
];

const SearchScreen = () => {
  return (
    <View style={styles.screen}>
      {/* Header Section */}
      <View style={styles.header}>
        <SearchBar autoFocus onSearch={(text) => console.log("Searching:", text)} />
        <FilterTabs onSelectFilter={(filter) => console.log("Filter:", filter)} />
      </View>

      {/* Content Section */}
      <ScrollView contentContainerStyle={styles.container}>
        <DoctorList doctors={MOCK_DOCTORS} />
        <HospitalList hospitals={MOCK_HOSPITALS} />
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F8FCFB", // Soft background color
  },
  header: {
    // borderTopColor:'red',
    // borderTopWidth:1,
    backgroundColor: "#FFFFFF", // White background for separation
    paddingHorizontal: 16,
    paddingBottom: 8,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Shadow for Android
    zIndex: 10,
    marginBottom: 12,
  },
  container: {
    paddingHorizontal: 8,
    paddingBottom: 12,
  },
});
