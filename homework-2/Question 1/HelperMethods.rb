module HelperMethods
    def titleize(str)
        leave_lower = ["in", "the", "of", "and", "or", "from"]
        str.downcase.split.map { |word| leave_lower.include?(word) ? word : word.capitalize }.join(" ")
    end
end
